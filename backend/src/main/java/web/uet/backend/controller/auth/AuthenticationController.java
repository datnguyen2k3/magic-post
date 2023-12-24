package web.uet.backend.controller.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.uet.backend.dto.auth.response.JwtAuthenticationResponse;
import web.uet.backend.dto.auth.request.TokenCreateRequest;
import web.uet.backend.service.auth.AuthenticationService;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/auth", produces = "application/json")
public class AuthenticationController {
  private final AuthenticationService authenticationService;

  @PostMapping("/token")
  public ResponseEntity<JwtAuthenticationResponse> getByTokenCreateRequest(@RequestBody TokenCreateRequest request) {
    return ResponseEntity.ok(authenticationService.getByTokenCreateRequest(request));
  }

}
