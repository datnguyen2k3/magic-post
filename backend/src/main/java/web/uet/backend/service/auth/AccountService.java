package web.uet.backend.service.auth;

import co.elastic.clients.elasticsearch._types.query_dsl.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchPage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import web.uet.backend.document.AccountDocument;
import web.uet.backend.dto.auth.AccountGeneralResponse;
import web.uet.backend.dto.business.request.AccountPageRequest;
import web.uet.backend.dto.business.response.AccountPageResponse;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.auth.UserAuthentication;
import web.uet.backend.mapper.auth.AccountGeneralFromDocumentMapper;
import web.uet.backend.mapper.auth.AccountGeneralMapper;
import web.uet.backend.repository.auth.elasticsearch.AccountDocumentRepository;
import web.uet.backend.repository.auth.entity.AccountRepository;

import java.util.List;
import java.util.UUID;

import static web.uet.backend.service.elasticsearch.search.ElasticsearchQueryUtils.containsQuery;
import static web.uet.backend.service.elasticsearch.search.ElasticsearchQueryUtils.matchQuery;

@Service
@RequiredArgsConstructor
public class AccountService implements UserDetailsService {

  private final AccountRepository accountRepository;
  private final AccountDocumentRepository accountDocumentRepository;
  private final AccountGeneralMapper accountGeneralMapper;
  private final AccountGeneralFromDocumentMapper accountGeneralFromDocumentMapper;

  private final ElasticsearchOperations elasticsearchOperations;
  private final ElasticsearchTemplate elasticsearchTemplate;

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

  public AccountGeneralResponse getCurrentAccountResponse() {
    Account currentAccount = AuthenticationService.getCurrentAccount();
    return accountGeneralMapper.toDto(currentAccount);
  }





  private Query getBy(AccountPageRequest request) {
    BoolQuery.Builder boolQueryBuilder = QueryBuilders.bool();

    if (request.getUsernameContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "username", request.getUsernameContains());
    }

    if (request.getNameContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "name", request.getNameContains());
    }

    if (request.getPhoneContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "phone", request.getPhoneContains());
    }

    if (request.getEmailContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "email", request.getEmailContains());
    }

    if (request.getAddressContains() != null) {
      boolQueryBuilder = containsQuery(boolQueryBuilder, "address", request.getAddressContains());
    }

    if (request.getRole() != null) {
      boolQueryBuilder = matchQuery(boolQueryBuilder, "role", request.getRole().getValue());
    }

    return new Query(boolQueryBuilder.build());
  }

  public AccountPageResponse getAll(AccountPageRequest request) {
    Sort sort = Sort.by(request.getDirection(), request.getSortBy().getValue());
    Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

    NativeQueryBuilder nativeQueryBuilder = NativeQuery.builder()
        .withQuery(getBy(request))
        .withPageable(pageable);

//    if (request.getSortBy() != null) {
//      nativeQueryBuilder.withSort(sort);
//    }

    SearchHits<AccountDocument> searchHits = elasticsearchOperations.search(nativeQueryBuilder.build(), AccountDocument.class);
    SearchPage<AccountDocument> searchPage = SearchHitSupport.searchPageFor(searchHits, nativeQueryBuilder.getPageable());

    List<AccountGeneralResponse> accounts =
        searchHits.stream().map(s -> accountGeneralFromDocumentMapper.toDto(s.getContent())).toList();

    return AccountPageResponse.builder()
        .totalElements(searchPage.getTotalElements())
        .totalPages(searchPage.getTotalPages())
        .accounts(accounts)
        .build();
  }

}
