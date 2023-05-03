package com.bakery.skynet.controller;

import com.bakery.skynet.exception.InvalidCredentialsException;
import com.bakery.skynet.exception.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RootController {

    @ExceptionHandler
    public void handleInvalidCredentialsException(
            final InvalidCredentialsException ex,
            final HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.UNAUTHORIZED.value(), ex.getMessage());
    }

    @ExceptionHandler
    public void handleUserAlreadyExistsException(
            final UserAlreadyExistsException ex,
            final HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
    }

}
