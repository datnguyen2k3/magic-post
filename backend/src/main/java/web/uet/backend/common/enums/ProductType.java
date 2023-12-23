package web.uet.backend.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ProductType {
    DOCUMENT("DOCUMENT"),
    PRODUCT("PRODUCT");

    private final String value;
}
