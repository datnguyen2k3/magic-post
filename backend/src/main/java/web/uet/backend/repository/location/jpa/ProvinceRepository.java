package web.uet.backend.repository.location.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.location.Province;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Integer> {
}
