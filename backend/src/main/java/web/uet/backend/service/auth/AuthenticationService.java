package web.uet.backend.service.auth;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import web.uet.backend.common.enums.Role;
import web.uet.backend.dto.auth.AccountCreateRequest;
import web.uet.backend.dto.auth.AccountGeneralResponse;
import web.uet.backend.dto.auth.JwtAuthenticationResponse;
import web.uet.backend.dto.auth.TokenCreateRequest;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.auth.UserAuthentication;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.exception.type.InvalidException;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.auth.AccountCommandMapper;
import web.uet.backend.mapper.auth.AccountGeneralMapper;
import web.uet.backend.repository.auth.entity.AccountRepository;
import web.uet.backend.repository.business.jpa.ShopRepository;

import java.util.Date;

import static web.uet.backend.service.auth.JwtService.EXPIRED_TIME;

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
    return JwtAuthenticationResponse.builder()
        .token(jwt)
        .expiredAt(new Date(System.currentTimeMillis() + EXPIRED_TIME))
        .build();
  }

  public static Account getCurrentAccount() {
    UserAuthentication userAuthentication = (UserAuthentication) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return userAuthentication.getAccount();
  }


  @Transactional
  public AccountGeneralResponse createAccount(AccountCreateRequest request) {
    Account authAccount = getCurrentAccount();
    accountRepository.findByUsername(request.getUsername())
        .ifPresent(account -> {
          throw new InvalidException("Username already exists");
        });

    if (!validateRole(request.getRole(), authAccount.getRole())) {
      throw new InvalidException("Invalid role");
    }

    Shop shop = shopRepository.findById(request.getWorkAt())
        .orElseThrow(() -> new NotFoundException("Shop not found"));

    if (request.getRole() == Role.POST_HEAD || request.getRole() == Role.WAREHOUSE_HEAD)
      if (accountRepository.existsByWorkAtAndRole(shop, request.getRole())) {
        throw new InvalidException("Each shop can only have one head");
    }

    Account newAccount = accountCommandMapper.toEntity(request);
    newAccount.setPassword(passwordEncoder.encode(request.getPassword()));
    newAccount.setWorkAt(shop);

    accountRepository.save(newAccount);
    return accountGeneralMapper.toDto(newAccount);
  }

  private boolean validateRole(Role create, Role request) {

    if (request == Role.CEO) {
      return create == Role.CEO || create == Role.WAREHOUSE_HEAD || create == Role.POST_HEAD;
    }

    if (request == Role.WAREHOUSE_HEAD || request == Role.POST_HEAD) {
      return create == Role.EMPLOYEE;
    }

    return false;
  }

}
