package web.uet.backend.exception.handler;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import web.uet.backend.exception.ErrorResponse;
import web.uet.backend.exception.type.InvalidAuthorizationException;
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

  @ExceptionHandler(ExpiredJwtException.class)
  public ResponseEntity<ErrorResponse> handleExpiredJwtException(ExpiredJwtException ex) {
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(InvalidAuthorizationException.class)
  public ResponseEntity<ErrorResponse> handleInvalidAuthorizationException(InvalidAuthorizationException ex) {
    return new ResponseEntity<>(ErrorResponse.builder()
        .error(ex.getMessage())
        .build(),
        HttpStatus.FORBIDDEN);
  }
}
