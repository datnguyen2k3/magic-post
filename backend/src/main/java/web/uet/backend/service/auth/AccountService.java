package web.uet.backend.service.auth;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import web.uet.backend.dto.auth.AccountCreateRequest;
import web.uet.backend.dto.auth.AccountGeneralResponse;
import web.uet.backend.entity.auth.UserAuthentication;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.mapper.auth.AccountCommandMapper;
import web.uet.backend.mapper.auth.AccountGeneralMapper;
import web.uet.backend.repository.AccountRepository;
import web.uet.backend.repository.ShopRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountService implements UserDetailsService {

  private final AccountRepository accountRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Account account = accountRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(username));
    return new UserAuthentication(account);
  }

  public UserDetails loadUserByAccountId(UUID accountId) {
    Account account = accountRepository.findById(accountId)
        .orElseThrow(() -> new RuntimeException("Account not found"));
    return new UserAuthentication(account);
  }

}
