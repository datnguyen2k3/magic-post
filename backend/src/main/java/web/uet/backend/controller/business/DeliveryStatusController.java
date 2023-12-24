package web.uet.backend.controller.business;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.uet.backend.dto.business.request.DeliveryStatusPageRequest;
import web.uet.backend.dto.business.response.delivery.DeliveryStatusPageResponse;
import web.uet.backend.service.business.DeliveryStatusService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/deliveryStatuses", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class DeliveryStatusController {

  private final DeliveryStatusService deliveryStatusService;

  @GetMapping("")
  public ResponseEntity<DeliveryStatusPageResponse> getDeliveryStatusPageResponseBy(
      @RequestBody(required = false) @Valid DeliveryStatusPageRequest request
  ) {
    if (request == null) request = DeliveryStatusPageRequest.builder().build();
    return ResponseEntity.ok(deliveryStatusService.getDeliveryStatusPageResponseBy(request));
  }

}
