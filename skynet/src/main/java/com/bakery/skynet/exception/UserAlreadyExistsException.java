package com.bakery.skynet.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }

    public static UserAlreadyExistsException commonMessage(String email) {
        return new UserAlreadyExistsException("User with email " + email + " already exists");
    }
}
