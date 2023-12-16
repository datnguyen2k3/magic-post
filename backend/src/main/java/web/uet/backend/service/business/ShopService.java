package web.uet.backend.service.business;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import web.uet.backend.common.enums.StatusType;
import web.uet.backend.entity.business.DeliveryStatus;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.event.DeliveryStatusCreateEvent;
import web.uet.backend.repository.business.jpa.ShopRepository;

@Service
@RequiredArgsConstructor
public class ShopService {

  private final ShopRepository shopRepository;

  @EventListener
  @Transactional
  public void prePersistDeliveryStatus(DeliveryStatusCreateEvent event) {
    DeliveryStatus deliveryStatus = (DeliveryStatus) event.getSource();
    Shop currentShop = deliveryStatus.getCurrentShop();
    Integer currentDeliveryNumber = currentShop.getCurrentDeliveryNumber();
    Integer goneDeliveryNumber = currentShop.getGoneDeliveryNumber();
    Integer comingDeliveryNumber = currentShop.getComingDeliveryNumber();

    shopRepository.save(currentShop);
  }

}
