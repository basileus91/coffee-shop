package com.coffeshop.app.service.dto;

import java.util.Objects;

/**
 * @author vasia
 * @created 02/01/2021 - 2:01 PM
 * @project coffeshop
 */
public class ContactEmail {
    private String name;
    private String email;
    private String message;

    public ContactEmail() {
    }

    public ContactEmail(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContactEmail that = (ContactEmail) o;
        return Objects.equals(name, that.name) &&
            Objects.equals(email, that.email) &&
            Objects.equals(message, that.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, email, message);
    }

    @Override
    public String toString() {
        return "ContactEmail{" +
            "name='" + name + '\'' +
            ", email='" + email + '\'' +
            ", message='" + message + '\'' +
            '}';
    }
}
