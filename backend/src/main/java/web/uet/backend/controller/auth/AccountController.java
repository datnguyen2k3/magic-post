package web.uet.backend.controller.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.uet.backend.dto.auth.AccountCreateRequest;
import web.uet.backend.dto.auth.AccountGeneralResponse;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.service.auth.AccountService;
import web.uet.backend.service.auth.AuthenticationService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/accounts", produces = "application/json")
public class AccountController {

  private final AuthenticationService authenticationService;

  @PostMapping("")
  public ResponseEntity<AccountGeneralResponse> createTest(
      @RequestBody AccountCreateRequest request
  ) {
    AccountGeneralResponse response = authenticationService.createAccount(request);
    return ResponseEntity.created(null).body(response);
  }

}
