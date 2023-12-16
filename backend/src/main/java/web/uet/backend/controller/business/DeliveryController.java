package web.uet.backend.controller.business;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.uet.backend.dto.business.DeliveryCreateRequest;
import web.uet.backend.dto.business.DeliveryGeneralResponse;
import web.uet.backend.service.business.DeliveryService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/deliveries", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class DeliveryController {

  private final DeliveryService deliveryService;

  @PostMapping("")
  public ResponseEntity<DeliveryGeneralResponse> createDelivery(
      @RequestBody DeliveryCreateRequest request
  ) {
    return ResponseEntity.created(null).body(deliveryService.createDeliveryByCreateRequest(request));
  }
}
