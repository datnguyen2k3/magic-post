package web.uet.backend.mapper.business.response;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import web.uet.backend.document.business.ShopDocument;
import web.uet.backend.dto.business.response.ShopGeneralResponse;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ShopGeneralMapperFromDocument extends GenericMapper<ShopGeneralResponse, ShopDocument> {
}
