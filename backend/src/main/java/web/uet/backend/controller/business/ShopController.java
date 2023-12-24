package web.uet.backend.controller.business;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.uet.backend.dto.business.request.ShopPageRequest;
import web.uet.backend.dto.business.response.ShopGeneralResponse;
import web.uet.backend.dto.business.response.ShopPageResponse;
import web.uet.backend.service.business.ShopService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/shops", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class ShopController {

  private final ShopService shopService;

  @GetMapping("/{shopId}")
  public ResponseEntity<ShopGeneralResponse> getShopGeneralResponseBy(@PathVariable Integer shopId) {
    return ResponseEntity.ok(shopService.getShopGeneralResponseBy(shopId));
  }

  @GetMapping("")
  public ResponseEntity<ShopPageResponse> getShopGeneralResponseBy(
      ShopPageRequest request
  ) {
    return ResponseEntity.ok(shopService.getShopPageResponseBy(request));
  }
}
