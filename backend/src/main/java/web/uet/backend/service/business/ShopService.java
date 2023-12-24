package web.uet.backend.service.business;

import jakarta.persistence.LockModeType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import web.uet.backend.common.enums.Role;
import web.uet.backend.dto.business.response.ShopGeneralResponse;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.event.DeliveryStatusCreateEvent;
import web.uet.backend.exception.type.InvalidAuthorizationException;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.business.response.ShopGeneralMapper;
import web.uet.backend.repository.business.jpa.ShopRepository;
import web.uet.backend.service.auth.AuthenticationService;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ShopService {

  private final ShopRepository shopRepository;

  private final ShopGeneralMapper shopGeneralMapper;

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



}
