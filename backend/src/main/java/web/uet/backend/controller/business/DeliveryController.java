package web.uet.backend.controller.business;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.uet.backend.dto.business.request.DeliveryCreateRequest;
import web.uet.backend.dto.business.request.DeliveryStatusCreateRequest;
import web.uet.backend.dto.business.response.DeliveryGeneralResponse;
import web.uet.backend.dto.business.response.DeliveryStatusGeneralResponse;
import web.uet.backend.service.business.DeliveryService;
import web.uet.backend.service.business.DeliveryStatusService;

import java.util.UUID;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/deliveries", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class DeliveryController {

  private final DeliveryService deliveryService;
  private final DeliveryStatusService deliveryStatusService;

  @PostMapping("")
  public ResponseEntity<DeliveryGeneralResponse> createDelivery(
      @RequestBody DeliveryCreateRequest request
  ) {
    return ResponseEntity.created(null).body(deliveryService.createDeliveryByCreateRequest(request));
  }

  @PostMapping("/{deliveryId}/status")
  public ResponseEntity<DeliveryStatusGeneralResponse> createDeliveryStatus(
      @RequestBody DeliveryStatusCreateRequest request,
      @RequestParam UUID deliveryId
  ) {
    return ResponseEntity.created(null).body(deliveryStatusService.createByDeliveryId(deliveryId, request));
  }


}
