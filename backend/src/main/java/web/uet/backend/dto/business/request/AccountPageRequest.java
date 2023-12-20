package web.uet.backend.dto.business.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.domain.Sort;
import web.uet.backend.common.enums.Role;
import web.uet.backend.common.enums.filter.AccountSort;
import web.uet.backend.common.enums.filter.DirectionSort;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountPageRequest {
  private Integer page;
  private Integer size;
  private AccountSort sortBy;
  private Sort.Direction direction;
  private String nameContains;
  private String usernameContains;
  private String emailContains;
  private String phoneContains;
  private String addressContains;
  private Role role;
}
