package web.uet.backend.entity.business;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;
import web.uet.backend.common.enums.StatusType;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(schema = "public", name = "delivery_status")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DeliveryStatus {
    @Id
    @Column(name = "delivery_status_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deliveryStatusId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private StatusType statusType;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
