import { authenticate } from "../auth.js";
import { verifyToken } from "../../utils/jwt.js";
import { AuthenticationError } from "../../utils/errors.js";
import { Request, Response, NextFunction } from "express";

jest.mock("../../utils/jwt.js", () => ({
  verifyToken: jest.fn(),
}));

jest.mock("../../utils/errors.js", () => ({
  AuthenticationError: jest.fn().mockImplementation((message) => ({
    message,
  })),
}));

describe("authenticate middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next if token is valid", async () => {
    req.headers = {};
    req.headers.authorization = "Bearer validToken";
    (verifyToken as jest.Mock).mockReturnValue({ userId: "123" });

    await authenticate(req as Request, res as Response, next);

    expect(verifyToken).toHaveBeenCalledWith("validToken");
    expect(req).toHaveProperty("user", { userId: "123" });
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if no token is provided", async () => {
    await authenticate(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token format is invalid", async () => {
    req.headers = {};
    req.headers.authorization = "InvalidFormat";

    await authenticate(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token format" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", async () => {
    req.headers = {};
    req.headers.authorization = "Bearer invalidToken";
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authenticate(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });
});
