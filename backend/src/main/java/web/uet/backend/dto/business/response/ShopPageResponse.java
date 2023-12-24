package web.uet.backend.dto.business.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.dto.location.response.CommuneGeneralResponse;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShopPageResponse {
  private Integer page;
  private Integer size;
  private long totalElements;
  private Integer totalPages;

  private List<ShopGeneralResponse> shops;
}
