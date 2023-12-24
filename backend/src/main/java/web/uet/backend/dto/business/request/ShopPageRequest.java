package web.uet.backend.dto.business.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.common.enums.ShopType;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShopPageRequest {

  @NotNull
  @Min(0)
  private Integer page = 0;

  @NotNull
  @Min(1)
  private Integer size = 10;

  private ShopType type;
}
