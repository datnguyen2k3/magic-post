package web.uet.backend.document.business;

import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "delivery")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDocument  {
}
