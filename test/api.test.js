const supertest = require("supertest");
const server = require("../server");

const request = supertest(server);

test("/api", async () => {
  const { body } = await request.get("/api").expect(200);
  expect(body.message).toBe("ok");
});

describe("GET /api/recipes", () => {
  test("200: responds with an array of recipe objects", async () => {
    const {
      body: { recipes },
    } = await request.get("/api/recipes").expect(200);
    expect(recipes.length).toBe(100);
    expect(recipes[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        imageUrl: expect.any(String),
        instructions: expect.any(String),
        ingredients: expect.any(Object),
      })
    );
  });
});
