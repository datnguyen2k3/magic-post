package web.uet.backend.dto.business.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.dto.enums.DeliveryStatusSort;
import web.uet.backend.entity.enums.ProductType;
import web.uet.backend.entity.enums.StatusType;
import web.uet.backend.dto.enums.DeliverySort;
import web.uet.backend.dto.enums.DirectionSort;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryStatusPageRequest {

  @NotNull
  @Min(0)
  private Integer page = 0;

  @NotNull
  @Min(1)
  private Integer size = 10;

  private DeliveryStatusSort sort;

  private DirectionSort direction;

  @Min(1)
  private Integer fromProvinceId;

  @Min(1)
  private Integer fromDistrictId;

  @Min(1)
  private Integer fromCommuneId;

  @Min(1)
  private Integer toProvinceId;

  @Min(1)
  private Integer toDistrictId;

  @Min(1)
  private Integer toCommuneId;


  private String fromAddressContains;
  private String toAddressContains;
  private String fromPhoneContains;
  private String toPhoneContains;
  private String fromNameContains;
  private String toNameContains;

  @Min(1)
  private Integer fromShopId;

  @Min(1)
  private Integer toShopId;
  private ProductType productType;
  private List<StatusType> statuses;

  @Min(1)
  private Integer currentShopId;
}
