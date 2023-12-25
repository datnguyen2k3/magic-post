package web.uet.backend.dto.auth.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.dto.business.response.ShopDetailResponse;

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
  private ShopDetailResponse workAt;
}
