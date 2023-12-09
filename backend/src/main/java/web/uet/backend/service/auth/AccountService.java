package web.uet.backend.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import web.uet.backend.entity.auth.UserAuthentication;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.repository.auth.entity.AccountRepository;

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
