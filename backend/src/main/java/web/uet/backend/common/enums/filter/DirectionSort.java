package web.uet.backend.common.enums.filter;

public enum DirectionSort {
  ASC("asc"),
  DESC("desc");

  private final String value;

  DirectionSort(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }
}
