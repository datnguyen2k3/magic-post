package web.uet.backend.repository.auth.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.document.AccountDocument;

import java.util.UUID;

@Repository
public interface AccountDocumentRepository extends ElasticsearchRepository<AccountDocument, UUID> {
}
