package web.uet.backend.dto.business.request;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.dto.enums.DeliverySort;
import web.uet.backend.dto.enums.DirectionSort;
import web.uet.backend.entity.enums.ProductType;
import web.uet.backend.entity.enums.StatusType;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryPageRequest {
  @NotNull
  @Min(0)
  private Integer page = 0;

  @NotNull
  @Positive
  private Integer size = 10;

  private DeliverySort sort;

  private DirectionSort direction;

  @Positive
  private Integer fromProvinceId;

  @Positive
  private Integer fromDistrictId;

  @Positive
  private Integer fromCommuneId;

  @Positive
  private Integer toProvinceId;

  @Positive
  private Integer toDistrictId;

  @Positive
  private Integer toCommuneId;


  private String fromAddressContains;
  private String toAddressContains;
  private String fromPhoneContains;
  private String toPhoneContains;
  private String fromNameContains;
  private String toNameContains;

  @Positive
  private Integer fromShopId;

  @Positive
  private Integer toShopId;
  private ProductType productType;

  // TODO: need to check if this is correct
  private List<StatusType> statuses;

  @Positive
  private Integer currentShopId;
}
