package web.uet.backend.service.auth;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import web.uet.backend.dto.auth.AccountCreateRequest;
import web.uet.backend.dto.auth.AccountGeneralResponse;
import web.uet.backend.dto.auth.JwtAuthenticationResponse;
import web.uet.backend.dto.auth.TokenCreateRequest;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.auth.UserAuthentication;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.mapper.auth.AccountCommandMapper;
import web.uet.backend.mapper.auth.AccountGeneralMapper;
import web.uet.backend.repository.entity.AccountRepository;
import web.uet.backend.repository.entity.ShopRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final AccountRepository accountRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final AccountCommandMapper accountCommandMapper;
  private final ShopRepository shopRepository;
  private final AccountGeneralMapper accountGeneralMapper;

  public JwtAuthenticationResponse getByTokenCreateRequest(TokenCreateRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

    var user = accountRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

    UserAuthentication userAuthentication = new UserAuthentication(user);
    var jwt = jwtService.generateToken(userAuthentication);
    return JwtAuthenticationResponse.builder().token(jwt).build();
  }

  public static Account getCurrentAccount() {
    UserAuthentication userAuthentication = (UserAuthentication) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return userAuthentication.getAccount();
  }


  @Transactional
  public AccountGeneralResponse createAccount(AccountCreateRequest request, Account authAccount) {
    Shop shop = shopRepository.findById(request.getWorkAt())
        .orElseThrow(() -> new RuntimeException("Shop not found"));

    Account newAccount = accountCommandMapper.toEntity(request);
    newAccount.setPassword(passwordEncoder.encode(request.getPassword()));
    newAccount.setWorkAt(shop);

    accountRepository.save(newAccount);
    return accountGeneralMapper.toDto(newAccount);
  }

}
