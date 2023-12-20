package web.uet.backend.service.business;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.uet.backend.repository.business.jpa.ShopRepository;

@Service
@RequiredArgsConstructor
public class ShopService {

  private final ShopRepository shopRepository;

}
