import argon2 from "argon2";
import { hashPassword, verifyPassword } from "../hashPassword.js";

jest.mock("argon2", () => ({
  hash: jest.fn(),
  verify: jest.fn(),
  argon2id: "argon2id",
}));

describe("hashPassword", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should hash the password with the correct config", async () => {
    (argon2.hash as jest.Mock).mockResolvedValue("hashedPassword123");

    const password = "mysecretpassword";
    const hashedPassword = await hashPassword(password);

    expect(argon2.hash).toHaveBeenCalledWith(password, expect.any(Object));
    expect(hashedPassword).toBe("hashedPassword123");
  });
});

describe("verifyPassword", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should verify the password correctly", async () => {
    (argon2.verify as jest.Mock).mockResolvedValue(true);

    const hashedPassword = "hashedPassword123";
    const candidatePassword = "mysecretpassword";
    const isValid = await verifyPassword(hashedPassword, candidatePassword);

    expect(argon2.verify).toHaveBeenCalledWith(
      hashedPassword,
      candidatePassword
    );
    expect(isValid).toBe(true);
  });

  it("should return false for incorrect password", async () => {
    (argon2.verify as jest.Mock).mockResolvedValue(false);

    const hashedPassword = "hashedPassword123";
    const candidatePassword = "wrongpassword";
    const isValid = await verifyPassword(hashedPassword, candidatePassword);

    expect(argon2.verify).toHaveBeenCalledWith(
      hashedPassword,
      candidatePassword
    );
    expect(isValid).toBe(false);
  });
});
