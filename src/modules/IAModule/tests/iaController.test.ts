import request from "supertest";
import { app } from "../../../app.js"; // Corrige la importación para usar la exportación nombrada

describe("IA Controller", () => {
  it("should return a response for a valid prompt", async () => {
    const response = await request(app)
      .post("/ia")
      .send({ prompt: "Test prompt" });

    expect(response.status).toBe(200);
    expect(response.body.result).toHaveProperty("iaResponse");
    expect(response.body.result.iaResponse).toHaveProperty("iaText");
  });

  it("should return an error for an invalid prompt", async () => {
    const response = await request(app)
      .post("/ia")
      .send({ prompt: 123 });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
  });

  it("should return an error for a missing prompt", async () => {
    const response = await request(app)
      .post("/ia")
      .send({});

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});
