package web.uet.backend.service.location;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.uet.backend.dto.location.response.ProvinceGeneralResponseList;
import web.uet.backend.entity.location.Province;
import web.uet.backend.entity.location.State;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.location.response.ProvinceGeneralMapper;
import web.uet.backend.repository.location.jpa.ProvinceRepository;
import web.uet.backend.repository.location.jpa.StateRepository;
import web.uet.backend.service.elasticsearch.sync.location.ProvinceSyncDataService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProvinceService {

  private final ProvinceRepository provinceRepository;
  private final StateRepository stateRepository;
  private final ProvinceGeneralMapper provinceGeneralMapper;

  public ProvinceGeneralResponseList getByStateId(Integer stateId) {
    State state = stateRepository.findById(stateId)
        .orElseThrow(() -> new NotFoundException("State not found"));

    List<Province> provinces = provinceRepository.findAllByState(state);
    return ProvinceGeneralResponseList.builder()
        .stateId(stateId)
        .provinces(provinceGeneralMapper.toDto(provinces))
        .build();
  }

  public ProvinceGeneralResponseList getAll() {
    List<Province> provinces = provinceRepository.findAll();
    return ProvinceGeneralResponseList.builder()
        .provinces(provinceGeneralMapper.toDto(provinces))
        .build();
  }
}
