package web.uet.backend.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;
import web.uet.backend.common.enums.Role;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountCreateRequest {

  @NotBlank
  private String username;

  @NotBlank
  private String password;

  @NotBlank
  private String name;

  @NotBlank
  private String email;

  @NotBlank
  private String phone;

  @NotBlank
  private String address;

  @NotNull
  private Role role;

  @Min(1)
  private Integer workAt;
}
