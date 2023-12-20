package web.uet.backend.service.business;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import web.uet.backend.dto.business.request.DeliveryStatusCreateRequest;
import web.uet.backend.dto.business.response.DeliveryStatusGeneralResponse;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.business.response.DeliveryStatusGeneralMapper;
import web.uet.backend.repository.business.jpa.DeliveryRepository;
import web.uet.backend.repository.business.jpa.DeliveryStatusRepository;
import web.uet.backend.repository.business.jpa.ShopRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeliveryStatusService {

  private final DeliveryStatusRepository deliveryStatusRepository;
  private final DeliveryRepository deliveryRepository;
  private final ShopRepository shopRepository;

  private final DeliveryStatusGeneralMapper deliveryStatusGeneralMapper;

  @Transactional
  public DeliveryStatusGeneralResponse createByDeliveryId(UUID deliveryId, DeliveryStatusCreateRequest request) {
    Delivery delivery = deliveryRepository.findById(deliveryId)
        .orElseThrow(() -> new NotFoundException("Delivery not found"));

    Shop currentShop = shopRepository.findById(request.getShopId())
        .orElseThrow(() -> new NotFoundException("Shop not found"));

    DeliveryStatus deliveryStatus = DeliveryStatus.builder()
        .delivery(delivery)
        .currentShop(currentShop)
        .statusType(request.getStatus())
        .build();

    deliveryStatus = deliveryStatusRepository.save(deliveryStatus);
    delivery.setCurrentShop(currentShop);
    delivery.setCurrentStatus(request.getStatus());

    deliveryRepository.save(delivery);

    return deliveryStatusGeneralMapper.toDto(deliveryStatus);
  }


}
