package web.uet.backend.mapper.business.response;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.dto.business.DeliveryGeneralResponse;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeliveryGeneralMapper extends GenericMapper<DeliveryGeneralResponse, Delivery> {
}
