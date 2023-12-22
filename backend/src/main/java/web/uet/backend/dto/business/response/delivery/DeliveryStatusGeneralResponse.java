package web.uet.backend.dto.business.response.delivery;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.common.enums.StatusType;
import web.uet.backend.dto.business.response.ShopGeneralResponse;
import web.uet.backend.dto.business.response.delivery.DeliveryGeneralResponse;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryStatusGeneralResponse {

  private Integer deliveryStatusId;

  private DeliveryGeneralResponse delivery;

  private StatusType statusType;

  private ShopGeneralResponse currentShop;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}
