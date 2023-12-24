package web.uet.backend.service.business;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
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

}
