package web.uet.backend.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.dto.business.ShopGeneralResponse;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountGeneralResponse {
  private String username;
  private String name;
  private String email;
  private String phone;
  private String address;
  private String role;
  private ShopGeneralResponse workAt;
}
