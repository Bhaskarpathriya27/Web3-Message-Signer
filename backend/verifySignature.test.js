/* eslint-disable @typescript-eslint/no-require-imports */
const request = require("supertest");
const app = require("./index");

describe("POST /verify-signature", () => {
  it("should fail on invalid input", async () => {
    const res = await request(app)
      .post("/verify-signature")
      .send({ message: null, signature: null });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("should verify a real message/signature pair", async () => {
    // This test expects a valid signature, you can generate one with your frontend!
    const message = "test backend";
    const signature = "0x0a938dF44DF196767530cBed0EF52b2202289359";
    const res = await request(app)
      .post("/verify-signature")
      .send({ message, signature });
    expect(res.statusCode).toBe(200);
    expect(res.body.isValid).toBe(true);
    expect(res.body.signer).toMatch(/^0x[a-fA-F0-9]{40}$/);
  });
});
