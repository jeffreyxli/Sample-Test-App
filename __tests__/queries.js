const app = require("../src/test-server/index");
const supertest = require("supertest");
const { stopDatabase } = require("../src/database");
 
afterAll(async () => {
  await stopDatabase();
});

test("Get test on root", async () => {
    response = await supertest(app)
    .get("/")
    .expect(200);
});

test("Post test on graphql", async () => {
    response = await supertest(app)
    .get("/graphql")
    .send({
      query: "{ users{ id } }",
    });
});
 
test("Post test on graphql", async () => {
    response = await supertest(app)
    .post("/graphql")
    .send({
      query: "{ users{ id, username, age, email } }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
});
