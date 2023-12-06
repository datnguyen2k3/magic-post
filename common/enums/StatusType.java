package web.uet.backend.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum StatusType {
    PICKED_UP,
    DELIVERING,
    DELIVERED
}
