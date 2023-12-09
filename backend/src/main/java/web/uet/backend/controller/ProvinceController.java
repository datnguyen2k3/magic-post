package web.uet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import web.uet.backend.dto.location.response.ProvinceGeneralResponseList;
import web.uet.backend.service.location.ProvinceService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/provinces", produces = "application/json")
public class ProvinceController {

  private final ProvinceService provinceService;

  @GetMapping("")
  public ResponseEntity<ProvinceGeneralResponseList> getAllProvinces() {
    return ResponseEntity.ok(provinceService.getAll());
  }

  @GetMapping("/auto-search")
  public ResponseEntity<ProvinceGeneralResponseList> getProvincesByAutoSearch(
      @RequestParam(required = true) String keyword
  ) {
    return ResponseEntity.ok(provinceService.getAutoByKeyword(keyword));
  }

}
