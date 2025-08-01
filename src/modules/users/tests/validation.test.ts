import { validationPostUser } from "../validation.js";

describe("User Validation", () => {
  it("should return null if all fields are valid", () => {
    const errors = validationPostUser(
      "Test",
      "User",
      "testuser",
      "test@example.com",
      "password123"
    );
    expect(errors).toBeUndefined();
  });

  it("should return an error if name is missing", () => {
    const errors = validationPostUser(
      "",
      "User",
      "testuser",
      "test@example.com",
      "password123"
    );
    expect(errors).toEqual({ message: "name is required" });
  });

  it("should return an error if lastName is missing", () => {
    const errors = validationPostUser(
      "Test",
      "",
      "testuser",
      "test@example.com",
      "password123"
    );
    expect(errors).toEqual({ message: "lastName is required" });
  });

  it("should return an error if userName is missing", () => {
    const errors = validationPostUser(
      "Test",
      "User",
      "",
      "test@example.com",
      "password123"
    );
    expect(errors).toEqual({ message: "userName is required" });
  });

  it("should return an error if email is missing", () => {
    const errors = validationPostUser(
      "Test",
      "User",
      "testuser",
      "",
      "password123"
    );
    expect(errors).toEqual({ message: "email is required" });
  });

  it("should return an error if password is missing", () => {
    const errors = validationPostUser(
      "Test",
      "User",
      "testuser",
      "test@example.com",
      ""
    );
    expect(errors).toEqual({ message: "password is required" });
  });

  it("should return an error if password is too short", () => {
    const errors = validationPostUser(
      "Test",
      "User",
      "testuser",
      "test@example.com",
      "123"
    );
    expect(errors).toEqual({
      message: "password must be at least 6 characters",
    });
  });
});
