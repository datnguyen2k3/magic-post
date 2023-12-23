package web.uet.backend.document.business;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.format.annotation.DateTimeFormat;
import web.uet.backend.common.enums.StatusType;
import web.uet.backend.entity.business.Shop;

import java.time.LocalDateTime;
import java.util.Date;

@Document(indexName = "delivery_status")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryStatusDocument {

  @Id
  private Integer deliveryStatusId;

  @Field(type = FieldType.Nested, includeInParent = true)
  private DeliveryDocument delivery;

  @Field(type = FieldType.Text, fielddata = true)
  private StatusType statusType;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument currentShop;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;
}
