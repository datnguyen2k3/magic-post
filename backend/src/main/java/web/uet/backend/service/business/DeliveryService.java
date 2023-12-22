package web.uet.backend.service.business;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.uet.backend.common.enums.Role;
import web.uet.backend.common.enums.ShopType;
import web.uet.backend.common.enums.StatusType;
import web.uet.backend.dto.business.request.DeliveryCreateRequest;
import web.uet.backend.dto.business.response.delivery.DeliveryGeneralResponse;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.exception.type.InvalidAuthorizationException;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.business.response.DeliveryGeneralMapper;
import web.uet.backend.repository.business.jpa.DeliveryRepository;
import web.uet.backend.repository.business.jpa.DeliveryStatusRepository;
import web.uet.backend.repository.business.jpa.ShopRepository;
import web.uet.backend.repository.location.jpa.CommuneRepository;
import web.uet.backend.service.auth.AuthenticationService;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DeliveryService {

  private final CommuneRepository communeRepository;
  private final ShopRepository shopRepository;
  private final DeliveryRepository deliveryRepository;
  private final DeliveryStatusRepository deliveryStatusRepository;

  private final DeliveryGeneralMapper deliveryGeneralMapper;

  @Transactional
  public DeliveryGeneralResponse createDeliveryByCreateRequest(DeliveryCreateRequest deliveryCreateRequest) {
    if (AuthenticationService.getCurrentAccount().getRole() != Role.EMPLOYEE
        || AuthenticationService.getCurrentAccount().getWorkAt().getType() != ShopType.POST
    ) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    Commune fromCommune = communeRepository.findById(deliveryCreateRequest.getFromCommuneId())
        .orElseThrow(() -> new NotFoundException("From commune not found"));

    Commune toCommune = communeRepository.findById(deliveryCreateRequest.getToCommuneId())
        .orElseThrow(() -> new NotFoundException("To commune not found"));

    Shop fromShop = shopRepository.findById(deliveryCreateRequest.getFromShop())
        .orElseThrow(() -> new NotFoundException("From shop not found"));

    Shop toShop = shopRepository.findById(deliveryCreateRequest.getToShop())
        .orElseThrow(() -> new NotFoundException("To shop not found"));

    if (AuthenticationService.getCurrentAccount().getWorkAt().getShopId() != fromShop.getShopId()) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    Delivery delivery = Delivery.builder()
        .fromCommune(fromCommune)
        .toCommune(toCommune)
        .fromAddress(deliveryCreateRequest.getFromAddress())
        .toAddress(deliveryCreateRequest.getToAddress())
        .fromPhone(deliveryCreateRequest.getFromPhone())
        .toPhone(deliveryCreateRequest.getToPhone())
        .fromName(deliveryCreateRequest.getFromName())
        .toName(deliveryCreateRequest.getToName())
        .fromShop(fromShop)
        .toShop(toShop)
        .productType(deliveryCreateRequest.getProductType())
        .currentStatus(StatusType.RECEIVED_FROM_CUSTOMER)
        .currentShop(fromShop)
        .createdAt(LocalDateTime.now())
        .updatedAt(LocalDateTime.now())
        .build();

    delivery = deliveryRepository.save(delivery);

    DeliveryStatus deliveryStatus = DeliveryStatus.builder()
        .delivery(delivery)
        .currentShop(delivery.getFromShop())
        .statusType(StatusType.RECEIVED_FROM_CUSTOMER)
        .build();

    deliveryStatusRepository.save(deliveryStatus);
    return deliveryGeneralMapper.toDto(delivery);
  }

}
