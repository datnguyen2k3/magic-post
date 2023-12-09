package web.uet.backend.mapper.business.response;

import org.mapstruct.Mapper;
import web.uet.backend.dto.business.ShopGeneralResponse;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface ShopGeneralMapper extends GenericMapper<ShopGeneralResponse, Shop> {
}
