package web.uet.backend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import web.uet.backend.entity.enums.Role;
import web.uet.backend.document.business.ShopDocument;

import java.util.UUID;

@Document(indexName = "account")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDocument {

  @Id
  private UUID accountId;

  @Field(type = FieldType.Text, fielddata = true)
  private String username;

  private String name;

  private String phone;

  private String email;

  private String address;

  @Field(type = FieldType.Text)
  private Role role;

  @Field(type = FieldType.Nested, includeInParent = true)
  private ShopDocument workAt;
}
