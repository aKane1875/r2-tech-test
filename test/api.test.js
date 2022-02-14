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

  test("200: recipes containing ingredients passed in query removed from returned array if passed one ingredient", async () => {
    const {
      body: { recipes },
    } = await request.get("/api/recipes/?exclude_ingredients=flax").expect(200);
    // There are 14 recipes with flax listed as ingredient
    expect(recipes.length).toBe(86);
  });

  test("200: recipes containing ingredients passed in query removed from returned array if passed multiple ingredients", async () => {
    const {
      body: { recipes },
    } = await request
      .get("/api/recipes/?exclude_ingredients=flax,coffee")
      .expect(200);
    // There are 14 recipes with flax and 15 with coffee listed as ingredient
    expect(recipes.length).toBe(71);
  });

  test("404: path not found", async () => {
    await request.get("/api/resipes").expect(404);
  });
});

describe("GET /api/recipes/:id", () => {
  test("200: responds with single recipe object if passed valid ID", async () => {
    const {
      body: { recipe },
    } = await request.get("/api/recipes/recipe-59").expect(200);
    expect(recipe).toEqual(
      expect.objectContaining({
        id: "recipe-59",
        imageUrl: "http://www.images.com/18",
        instructions:
          "60 seconds on the highest setting your blender has, or until a smooth paste has formed",
        ingredients: [
          { name: "demerara sugar", grams: 25 },
          { name: "flax", grams: 66 },
          { name: "apple juice", grams: 44 },
          { name: "oat milk", grams: 198 },
        ],
      })
    );
  });
});
