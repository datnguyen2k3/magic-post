package web.uet.backend.dto.business.response.delivery;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.common.enums.StatusType;
import web.uet.backend.dto.business.response.ShopGeneralResponse;
import web.uet.backend.entity.business.Shop;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryStatusDetailResponse {

  private Integer deliveryStatusId;

  private DeliveryGeneralResponse delivery;

  private StatusType statusType;

  @JsonProperty("shop")
  private ShopGeneralResponse currentShop;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime createdAt;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime updatedAt;
}
