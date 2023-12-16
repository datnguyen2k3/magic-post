package web.uet.backend.service.business;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import web.uet.backend.common.enums.StatusType;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.event.DeliveryCreateEvent;
import web.uet.backend.event.DeliveryStatusCreateEvent;
import web.uet.backend.repository.business.jpa.DeliveryStatusRepository;

@Service
@RequiredArgsConstructor
public class DeliveryStatusService {

  private final DeliveryStatusRepository deliveryStatusRepository;

  private final ApplicationEventPublisher applicationEventPublisher;

  @EventListener
  @Transactional
  public void createStartDeliveryStatus(DeliveryCreateEvent event) {

    Delivery delivery = (Delivery) event.getSource();

    DeliveryStatus deliveryStatus = DeliveryStatus.builder()
        .delivery(delivery)
        .currentShop(delivery.getFromShop())
        .statusType(StatusType.RECEIVED_FROM_CUSTOMER)
        .build();

    deliveryStatus = deliveryStatusRepository.save(deliveryStatus);
    applicationEventPublisher.publishEvent(new DeliveryStatusCreateEvent(deliveryStatus));
  }
}
