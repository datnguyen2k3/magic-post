package web.uet.backend.service.business;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import jakarta.persistence.LockModeType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchPage;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import web.uet.backend.document.business.ShopDocument;
import web.uet.backend.dto.business.request.ShopPageRequest;
import web.uet.backend.dto.business.response.ShopGeneralResponse;
import web.uet.backend.dto.business.response.ShopPageResponse;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.entity.enums.Role;
import web.uet.backend.event.DeliveryStatusCreateEvent;
import web.uet.backend.exception.type.InvalidAuthorizationException;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.business.response.ShopGeneralMapper;
import web.uet.backend.mapper.business.response.ShopGeneralMapperFromDocument;
import web.uet.backend.repository.business.jpa.ShopRepository;
import web.uet.backend.service.auth.AuthenticationService;

import java.util.List;

import static web.uet.backend.service.elasticsearch.search.ElasticsearchQueryUtils.matchQuery;

@Service
@RequiredArgsConstructor
public class ShopService {

  private final ShopRepository shopRepository;

  private final ShopGeneralMapper shopGeneralMapper;
  private final ShopGeneralMapperFromDocument shopGeneralMapperFromDocument;

  private final ElasticsearchOperations elasticsearchOperations;

  @EventListener
  @Transactional
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  public void updateDeliveryNumber(DeliveryStatusCreateEvent event) {
    DeliveryStatus deliveryStatus = (DeliveryStatus) event.getSource();
    Shop currentShop = deliveryStatus.getCurrentShop();

    Integer currentDeliveryNumber = currentShop.getCurrentDeliveryNumber();
    Integer comingDeliveryNumber = currentShop.getComingDeliveryNumber();
    Integer goneDeliveryNumber = currentShop.getGoneDeliveryNumber();

    switch (deliveryStatus.getStatusType()) {
      case RECEIVED_FROM_CUSTOMER, SENT_TO_CUSTOMER_FAIL:
        currentShop.setCurrentDeliveryNumber(currentDeliveryNumber + 1);
        break;
      case GONE_FROM_SHOP:
        currentShop.setCurrentDeliveryNumber(currentDeliveryNumber - 1);
        break;
      case COMING_TO_SHOP:
        currentShop.setComingDeliveryNumber(comingDeliveryNumber + 1);
        break;
      case RECEIVED_FROM_SHOP:
        currentShop.setComingDeliveryNumber(comingDeliveryNumber - 1);
        currentShop.setCurrentDeliveryNumber(currentDeliveryNumber + 1);
        break;
      case SHIPPING_TO_CUSTOMER:
        currentShop.setCurrentDeliveryNumber(currentDeliveryNumber - 1);
        currentShop.setGoneDeliveryNumber(goneDeliveryNumber + 1);
        break;
      case SENT_TO_CUSTOMER_SUCCESS:
        break;
    }
    shopRepository.save(currentShop);
  }

  public ShopGeneralResponse getShopGeneralResponseBy(Integer shopId) {
    Account currentAccount = AuthenticationService.getCurrentAccount();
    if (currentAccount.getRole() != Role.CEO && !currentAccount.getWorkAt().getShopId().equals(shopId)) {
      throw new InvalidAuthorizationException("You are not have permission to access this shop");
    }

    Shop shop = shopRepository.findById(shopId)
        .orElseThrow(() -> new NotFoundException("Shop not found"));

    return shopGeneralMapper.toDto(shop);
  }

  private Query getQueryBy(ShopPageRequest request) {
    BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();
    if (request.getType() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "type", request.getType().getValue());
    }

    if (request.getCommuneId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "commune.communeId", request.getCommuneId());
    } else if (request.getDistrictId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "commune.district.districtId", request.getDistrictId());
    } else if (request.getProvinceId() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "commune.district.province.provinceId", request.getProvinceId());
    }

    return new Query(boolQueryBuilder.build());
  }

  public ShopPageResponse getShopPageResponseBy(ShopPageRequest request) {
    Account currentAccount = AuthenticationService.getCurrentAccount();
    if (currentAccount.getRole() != Role.CEO) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

    NativeQueryBuilder nativeQueryBuilder = NativeQuery.builder()
        .withQuery(getQueryBy(request))
        .withPageable(pageable);

    SearchHits<ShopDocument> searchHits = elasticsearchOperations.search(
        nativeQueryBuilder.build(),
        ShopDocument.class
    );
    SearchPage<ShopDocument> searchPage = SearchHitSupport.searchPageFor(searchHits, pageable);
    List<ShopGeneralResponse> shops =
        searchHits.stream().map(s -> shopGeneralMapperFromDocument.toDto(s.getContent())).toList();

    return ShopPageResponse.builder()
        .shops(shops)
        .page(request.getPage())
        .size(request.getSize())
        .totalElements(searchPage.getTotalElements())
        .totalPages(searchPage.getTotalPages())
        .build();
  }

}
