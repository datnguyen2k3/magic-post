package web.uet.backend.common.enums.filter;

import lombok.Getter;

@Getter
public enum AccountSort {
  USERNAME("username"),
  NAME("name"),
  EMAIL("email"),
  PHONE("phone"),
  ADDRESS("address");

  private final String value;

  AccountSort(String value) {
    this.value = value;
  }

}
