package web.uet.backend.dto.business.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.common.enums.ProductType;
import web.uet.backend.common.enums.StatusType;
import web.uet.backend.common.enums.filter.DeliverySort;
import web.uet.backend.common.enums.filter.DirectionSort;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryPageRequest {

  private Integer page;

  private Integer size;

  private DeliverySort sort;

  private DirectionSort direction;

  private Integer fromProvinceId;
  private Integer fromDistrictId;
  private Integer fromCommuneId;
  private Integer toProvinceId;
  private Integer toDistrictId;
  private Integer toCommuneId;
  private String fromAddressContains;
  private String toAddressContains;
  private String fromPhoneContains;
  private String toPhoneContains;
  private String fromNameContains;
  private String toNameContains;
  private Integer fromShopId;
  private Integer toShopId;
  private ProductType productType;
  private List<StatusType> statuses;
  private Integer currentShopId;


}
