package web.uet.backend.entity.business;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;
import org.springframework.context.event.ApplicationContextEvent;
import web.uet.backend.common.enums.ProductType;
import web.uet.backend.entity.location.Commune;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(schema = "public", name = "delivery")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Delivery {

    @Id
    @Column(name = "delivery_id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID deliveryId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "from_commune_id")
    private Commune fromCommune;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "to_commune_id")
    private Commune toCommune;

    @Column(name = "from_address")
    private String fromAddress;

    @Column(name = "to_address")
    private String toAddress;

    @Column(name = "from_phone")
    private String fromPhone;

    @Column(name = "to_phone")
    private String toPhone;

    @Column(name = "from_name")
    private String fromName;

    @Column(name = "to_name")
    private String toName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "from_shop_id")
    private Shop fromShop;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "to_shop_id")
    private Shop toShop;

    @Enumerated(EnumType.STRING)
    @Column(name = "product", columnDefinition = "product_type")
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private ProductType productType;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
