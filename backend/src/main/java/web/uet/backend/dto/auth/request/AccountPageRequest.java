package web.uet.backend.dto.auth.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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
  @NotNull
  @Min(0)
  private Integer page = 0;

  @NotNull
  @Min(1)
  private Integer size = 10;

  private AccountSort sortBy;
  private Sort.Direction direction;
  private String nameContains;
  private String usernameContains;
  private String emailContains;
  private String phoneContains;
  private String addressContains;
  private Role role;
}
