package web.uet.backend.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import web.uet.backend.exception.ErrorResponse;
import web.uet.backend.exception.type.InvalidException;
import web.uet.backend.exception.type.NotFoundException;

@ControllerAdvice
public class ExceptionHandlerController {
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException ex) {
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InvalidException.class)
  public ResponseEntity<ErrorResponse> handleInvalidException(InvalidException ex) {
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.BAD_REQUEST);
  }
}
