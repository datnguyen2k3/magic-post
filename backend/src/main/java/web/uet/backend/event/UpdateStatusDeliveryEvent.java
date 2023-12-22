package web.uet.backend.event;

import org.springframework.context.ApplicationEvent;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.entity.business.DeliveryStatus;

public class UpdateStatusDeliveryEvent extends ApplicationEvent {
  public UpdateStatusDeliveryEvent(DeliveryStatus source) {
    super(source);
  }

}
