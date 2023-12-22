package web.uet.backend.service.elasticsearch.search;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.WildcardQuery;
import org.springframework.stereotype.Service;

@Service
public class ElasticsearchQueryUtils {

  static public BoolQuery.Builder containsQuery(BoolQuery.Builder query, String field, String value) {
    return query.must(
        new Query(
            new WildcardQuery.Builder()
                .field(field)
                .value("*" + value + "*")
                .build()
        )
    );
  }

  static public BoolQuery.Builder matchQuery(BoolQuery.Builder query, String field, String value) {
    return query.must(
        new Query(
            new MatchQuery.Builder()
                .field(field)
                .query(value)
                .build()
        )
    );
  }
}
