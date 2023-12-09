package web.uet.backend.repository.location.document;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.document.location.CommuneDocument;

@Repository
public interface CommuneDocumentRepository extends ElasticsearchRepository<CommuneDocument, Integer> {
}
