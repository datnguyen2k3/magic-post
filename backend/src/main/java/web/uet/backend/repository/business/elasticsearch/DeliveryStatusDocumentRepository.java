package web.uet.backend.repository.business.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import web.uet.backend.document.business.DeliveryStatusDocument;

public interface DeliveryStatusDocumentRepository extends ElasticsearchRepository<DeliveryStatusDocument, Integer> {
}
