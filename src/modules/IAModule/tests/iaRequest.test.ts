import { iaRequest } from "../iaRequest.js";


describe("iaRequest function", () => {
  it("should return a valid response for a valid prompt", async () => {
    const mockPrompt = "https://example.com/job-vacancy";

    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  content: "Mocked IA response",
                },
              },
            ],
            usage: {
              total_tokens: 1000,
            },
          }),
      })
    );

    global.fetch = mockFetch as unknown as typeof fetch;

    const result = await iaRequest(mockPrompt);

    expect(result).toHaveProperty("iaText", "Mocked IA response");
    expect(result).toHaveProperty("tokensRemaining", 3096);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  });

  it("should throw an error for a failed fetch", async () => {
    const mockPrompt = "https://example.com/job-vacancy";

    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    global.fetch = mockFetch as unknown as typeof fetch;

    await expect(iaRequest(mockPrompt)).rejects.toThrow("HTTP error! status: 500");
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  });

  it("should throw an error for an unknown error", async () => {
    const mockPrompt = "https://example.com/job-vacancy";

    const mockFetch = jest.fn(() => {
      throw new Error("Unknown error");
    });

    global.fetch = mockFetch as unknown as typeof fetch;

    await expect(iaRequest(mockPrompt)).rejects.toThrow("Error in iaRequest: Unknown error");
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  });
});
