package web.uet.backend.dto.business;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.common.enums.ProductType;
import web.uet.backend.dto.location.response.CommuneGeneralResponse;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.entity.location.Commune;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryGeneralResponse {

  private CommuneGeneralResponse fromCommune;

  private CommuneGeneralResponse toCommune;

  private String fromAddress;

  private String toAddress;

  private String fromPhone;

  private String toPhone;

  private String fromName;

  private String toName;

  private ShopGeneralResponse fromShop;

  private ShopGeneralResponse toShop;

  private ProductType productType;
}
