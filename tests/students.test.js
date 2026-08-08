const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
const Student = require("../src/models/Student");

beforeAll(async () => {
//   await mongoose.connect("mongodb://localhost:27017/student_db_test");
  await mongoose.connect("mongodb://host.docker.internal:27017/student_db_test");
});

afterEach(async () => {
  await Student.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Student CRUD API", () => {

  test("POST /api/students - create student", async () => {
    const response = await request(app)
      .post("/api/students")
      .send({
        name: "Sanjeev",
        email: "sanjeev@test.com",
        age: 30
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Sanjeev");
    expect(response.body.email).toBe("sanjeev@test.com");
  });


  test("GET /api/students - get all students", async () => {
    await Student.create({
      name: "John",
      email: "john@test.com",
      age: 25
    });

    const response = await request(app)
      .get("/api/students");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("John");
  });


  test("GET /api/students/:id - get student", async () => {
    const student = await Student.create({
      name: "David",
      email: "david@test.com",
      age: 28
    });

    const response = await request(app)
      .get(`/api/students/${student._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("David");
  });


  test("PUT /api/students/:id - update student", async () => {
    const student = await Student.create({
      name: "Alex",
      email: "alex@test.com",
      age: 22
    });

    const response = await request(app)
      .put(`/api/students/${student._id}`)
      .send({
        name: "Alex Updated",
        age: 23
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Alex Updated");
    expect(response.body.age).toBe(23);
  });


  test("DELETE /api/students/:id - delete student", async () => {
    const student = await Student.create({
      name: "Robert",
      email: "robert@test.com",
      age: 26
    });

    const response = await request(app)
      .delete(`/api/students/${student._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Student deleted successfully"
    );

    const deletedStudent = await Student.findById(student._id);

    expect(deletedStudent).toBeNull();
  });


  test("GET /api/students/:id - student not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .get(`/api/students/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Student not found");
  });

});