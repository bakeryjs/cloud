package com.bakery.skynet.exception;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }

    public static InvalidCredentialsException commonMessage() {
        return new InvalidCredentialsException("Invalid user credentials");
    }
}
