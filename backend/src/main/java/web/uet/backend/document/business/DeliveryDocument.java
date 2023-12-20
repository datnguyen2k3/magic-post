package web.uet.backend.document.business;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import web.uet.backend.common.enums.ProductType;
import web.uet.backend.common.enums.StatusType;
import web.uet.backend.document.location.CommuneDocument;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.entity.location.Commune;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(indexName = "delivery")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDocument {

  @Id
  private UUID deliveryId;

  @Field(type = FieldType.Nested, includeInParent = true)
  private CommuneDocument fromCommune;

  @Field(type = FieldType.Nested, includeInParent = true)
  private CommuneDocument toCommune;

  private String fromAddress;

  private String toAddress;

  private String fromPhone;

  private String toPhone;

  private String fromName;

  private String toName;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument fromShop;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument toShop;

  @Field(type = FieldType.Text, fielddata = true)
  private ProductType productType;

  @Field(type = FieldType.Text, fielddata = true)
  private StatusType currentStatus;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument currentShop;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}
