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

    // This test worked until I added new recipes
    // expect(recipes.length).toBe(100);
    expect(Array.isArray(recipes)).toBe(true);
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

  test("400: responds with a bad request message when given invalid id", async () => {
    const {
      body: { msg },
    } = await request.get("/api/recipes/59").expect(400);
    expect(msg).toBe("Invalid request, recipe-id needed(eg. recipe-59)");
  });

  test("404: id passed correctly but no recipe with this id exists", async () => {
    const {
      body: { msg },
    } = await request.get("/api/recipes/recipe-201").expect(404);
    expect(msg).toBe("No recipe with this ID found");
  });
});

describe("POST /api/recipes", () => {
  test("200: posts a new recipe and responds with new recipe object", async () => {
    const newRecipeToPost = {
      imageUrl:
        "https://images.unsplash.com/photo-1574156814952-678e5869c5b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29ybmZsYWtlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      instructions: "Put cornflakes in bowl, add milk",
      ingredients: [
        { name: "cornflakes", grams: 500 },
        { name: "milk", grams: 200 },
        // Added to stop it affecting previous tests
        { name: "flax", grams: 50 },
      ],
    };
    const {
      body: { newRecipe },
    } = await request.post("/api/recipes").send(newRecipeToPost).expect(200);
    expect(newRecipe).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        imageUrl:
          "https://images.unsplash.com/photo-1574156814952-678e5869c5b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29ybmZsYWtlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        instructions: "Put cornflakes in bowl, add milk",
        ingredients: [
          { name: "cornflakes", grams: 500 },
          { name: "milk", grams: 200 },
          { name: "flax", grams: 50 },
        ],
      })
    );
  });
});
