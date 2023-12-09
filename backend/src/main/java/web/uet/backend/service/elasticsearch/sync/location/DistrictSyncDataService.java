package web.uet.backend.service.elasticsearch.sync.location;

import org.springframework.stereotype.Service;
import web.uet.backend.document.location.DistrictDocument;
import web.uet.backend.entity.location.District;
import web.uet.backend.mapper.business.document.DistrictDocumentMapper;
import web.uet.backend.repository.location.document.DistrictDocumentRepository;
import web.uet.backend.repository.location.entity.DistrictRepository;
import web.uet.backend.service.elasticsearch.sync.GenericSyncDataService;

@Service
public class DistrictSyncDataService extends GenericSyncDataService<
    DistrictDocument, District, Integer, DistrictDocumentRepository, DistrictRepository, DistrictDocumentMapper> {

  public DistrictSyncDataService(DistrictDocumentRepository districtDocumentRepository, DistrictRepository districtRepository, DistrictDocumentMapper districtDocumentMapper) {
    super(districtDocumentRepository, districtRepository, districtDocumentMapper);
  }
}
