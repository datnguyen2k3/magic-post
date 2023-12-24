package web.uet.backend.dto.business.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import web.uet.backend.entity.enums.ProductType;

import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeliveryCreateRequest {

  @Min(1)
  @NotNull
  private Integer fromCommuneId;

  @Min(1)
  @NotNull
  private Integer toCommuneId;

  @NotBlank
  private String fromAddress;

  @NotBlank
  private String toAddress;

  @NotBlank
  private String fromPhone;

  @NotBlank
  private String toPhone;

  @NotBlank
  private String fromName;

  @NotBlank
  private String toName;

  @Min(1)
  private Integer fromShop;

  @Min(1)
  private Integer toShop;

  private ProductType productType;

  @NotBlank
  private String name;

  @NotBlank
  private String description;

  @NotNull
  private BigDecimal shippingFee;

  @NotNull
  private BigDecimal weight;
}
