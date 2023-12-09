package web.uet.backend.service.elasticsearch;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import web.uet.backend.mapper.GenericMapper;

import java.util.List;

@AllArgsConstructor
public abstract class GenericSyncDataService<
    D, E, T,
    DR extends ElasticsearchRepository<D, T>,
    ER extends JpaRepository<E, T>,
    M extends GenericMapper<D, E>> {

  protected final DR dr;
  protected final ER er;
  protected final M m;

  @PostConstruct
  protected void syncData() {
    List<E> entities = er.findAll();
    List<D> documents = entities.stream().map(m::toDto).toList();
    dr.deleteAll();
    dr.saveAll(documents);
  }

  @PostUpdate
  protected void updateDocument(E e) {
    D d = m.toDto(e);
    dr.save(d);
  }

  @PostRemove
  protected void deleteDocument(E e) {
    D d = m.toDto(e);
    dr.delete(d);
  }

}
