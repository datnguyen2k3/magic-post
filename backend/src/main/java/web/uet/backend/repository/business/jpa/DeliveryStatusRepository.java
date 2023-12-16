package web.uet.backend.repository.business.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.business.DeliveryStatus;

@Repository
public interface DeliveryStatusRepository extends JpaRepository<DeliveryStatus, Integer> {
}
