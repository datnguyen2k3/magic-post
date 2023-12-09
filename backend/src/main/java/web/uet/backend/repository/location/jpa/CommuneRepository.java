package web.uet.backend.repository.location.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.location.Commune;

@Repository
public interface CommuneRepository extends JpaRepository<Commune, Integer> {
}
