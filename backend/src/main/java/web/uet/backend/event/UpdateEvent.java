package web.uet.backend.event;

import org.springframework.context.ApplicationEvent;

public class UpdateEvent<E>  extends ApplicationEvent {
  public UpdateEvent(E source) {
    super(source);
  }
}
