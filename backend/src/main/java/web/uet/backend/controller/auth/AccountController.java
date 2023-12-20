package web.uet.backend.controller.auth;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.uet.backend.dto.auth.AccountCreateRequest;
import web.uet.backend.dto.auth.AccountGeneralResponse;
import web.uet.backend.service.auth.AccountService;
import web.uet.backend.service.auth.AuthenticationService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/accounts", produces = "application/json")
@SecurityRequirement(name = "Bearer Authentication")
public class AccountController {

  private final AuthenticationService authenticationService;
  private final AccountService accountService;

  @PostMapping("")
  public ResponseEntity<AccountGeneralResponse> createAccount(
      @RequestBody AccountCreateRequest request
  ) {
    AccountGeneralResponse response = authenticationService.createAccount(request);
    return ResponseEntity.created(null).body(response);
  }

  @GetMapping("/profile")
  public ResponseEntity<AccountGeneralResponse> getByCurrentAccount() {
    return ResponseEntity.ok(accountService.getCurrentAccountResponse());
  }

}
