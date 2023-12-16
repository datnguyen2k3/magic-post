package web.uet.backend.service.business;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import web.uet.backend.common.enums.Role;
import web.uet.backend.common.enums.ShopType;
import web.uet.backend.dto.business.DeliveryCreateRequest;
import web.uet.backend.dto.business.DeliveryGeneralResponse;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.event.DeliveryCreateEvent;
import web.uet.backend.exception.type.InvalidAuthorizationException;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.business.response.DeliveryGeneralMapper;
import web.uet.backend.repository.business.jpa.DeliveryRepository;
import web.uet.backend.repository.business.jpa.ShopRepository;
import web.uet.backend.repository.location.jpa.CommuneRepository;
import web.uet.backend.service.auth.AuthenticationService;

@Service
@RequiredArgsConstructor
public class DeliveryService {

  private final ApplicationEventPublisher applicationEventPublisher;

  private final CommuneRepository communeRepository;
  private final ShopRepository shopRepository;
  private final DeliveryRepository deliveryRepository;

  private final DeliveryGeneralMapper deliveryGeneralMapper;

  @PersistenceContext
  private EntityManager entityManager;

  @Transactional
  public DeliveryGeneralResponse createDeliveryByCreateRequest(DeliveryCreateRequest deliveryCreateRequest) {
    if (AuthenticationService.getCurrentAccount().getRole() != Role.EMPLOYEE
        || AuthenticationService.getCurrentAccount().getWorkAt().getType() != ShopType.POST
    ) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    Commune fromCommune = communeRepository.findById(deliveryCreateRequest.getFromCommuneId())
        .orElseThrow(() -> new NotFoundException("From commune not found"));

    Commune toCommune = communeRepository.findById(deliveryCreateRequest.getToCommuneId())
        .orElseThrow(() -> new NotFoundException("To commune not found"));

    Shop fromShop = shopRepository.findById(deliveryCreateRequest.getFromShop())
        .orElseThrow(() -> new NotFoundException("From shop not found"));

    Shop toShop = shopRepository.findById(deliveryCreateRequest.getToShop())
        .orElseThrow(() -> new NotFoundException("To shop not found"));

    if (AuthenticationService.getCurrentAccount().getWorkAt().getShopId() != fromShop.getShopId()) {
      throw new InvalidAuthorizationException("Permission denied");
    }

    Delivery delivery = Delivery.builder()
        .fromCommune(fromCommune)
        .toCommune(toCommune)
        .fromAddress(deliveryCreateRequest.getFromAddress())
        .toAddress(deliveryCreateRequest.getToAddress())
        .fromPhone(deliveryCreateRequest.getFromPhone())
        .toPhone(deliveryCreateRequest.getToPhone())
        .fromName(deliveryCreateRequest.getFromName())
        .toName(deliveryCreateRequest.getToName())
        .fromShop(fromShop)
        .toShop(toShop)
        .productType(deliveryCreateRequest.getProductType())
        .build();

    delivery = deliveryRepository.save(delivery);
    applicationEventPublisher.publishEvent(new DeliveryCreateEvent(delivery));

    return deliveryGeneralMapper.toDto(delivery);
  }

}
