import request from "supertest";
import app from "../src/server";

let token: string = "";
let project1: number = 0;
let project2: number = 0;
let artifactId: number = 0;
let backlogId: number = 0;

beforeAll(async () => {
  console.log("🔥 Preparando entorno de pruebas...");

  // 1) Registrar usuario real (si ya existe, ignorar)
  await request(app).post("/auth/register").send({
    username: "tester",
    password: "123456",
  });

  // 2) Login real
  const res = await request(app).post("/auth/login").send({
    username: "tester",
    password: "123456",
  });

  token = res.body.token;
  expect(token).toBeDefined();
});

//
// 🟣 PROJECTS
//
describe("🟣 PROJECTS", () => {
  test("Crear proyecto #1", async () => {
    const res = await request(app)
      .post("/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Proyecto Test 1" });

    expect(res.status).toBe(200);
    project1 = res.body.id;
  });

  test("Crear proyecto #2", async () => {
    const res = await request(app)
      .post("/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Proyecto Test 2" });

    expect(res.status).toBe(200);
    project2 = res.body.id;
  });

  test("Listar proyectos", async () => {
    const res = await request(app)
      .get("/projects/list")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Obtener proyecto por ID", async () => {
    const res = await request(app)
      .get(`/projects/${project1}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(project1);
  });

  test("Archivar proyecto", async () => {
    const res = await request(app)
      .patch(`/projects/${project1}/archive`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});

//
// 🟡 ARTIFACTS
//
describe("🟡 ARTIFACTS", () => {
  test("Crear artefacto", async () => {
    const res = await request(app)
      .post(`/projects/${project2}/artifacts`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Documento X",
        description: "Descripción de prueba",
        phase_name: "Inception",
      });

    expect(res.status).toBe(200);
  });

  test("Listar artefactos", async () => {
    const res = await request(app)
      .get(`/projects/${project2}/artifacts`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    artifactId = res.body[0].id;
  });

  test("Eliminar artefacto", async () => {
    const res = await request(app)
      .delete(`/artifacts/${artifactId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});

//
// 🟠 BACKLOG
//
describe("🟠 BACKLOG", () => {
  test("Crear item del backlog", async () => {
    const res = await request(app)
      .post(`/projects/${project2}/backlog`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Historia de prueba",
        description: "Algo importante",
        priority: "Medium",
      });

    expect(res.status).toBe(200);
    backlogId = res.body.id;
  });

  test("Listar backlog", async () => {
    const res = await request(app)
      .get(`/projects/${project2}/backlog`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

//
// 🟢 ITERACIONES
//
describe("🟢 ITERACIONES", () => {
  test("Crear iteración", async () => {
    const res = await request(app)
      .post(`/projects/${project2}/iteraciones`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        nombre: "Iteración 1",
        objetivo: "Completar funcionalidad base",
        fecha_inicio: "2025-01-01",
        fecha_fin: "2025-01-15",
      });

    expect(res.status).toBe(200);
  });

  test("Listar iteraciones", async () => {
    const res = await request(app)
      .get(`/projects/${project2}/iteraciones`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

//
// 🔵 PLAN
//
describe("🔵 PLAN", () => {
  test("Crear plan de proyecto", async () => {
    const res = await request(app)
      .post(`/projects/${project2}/plan`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        objetivo: "Plan objetivo",
        alcance: "Plan alcance",
        riesgos: "Plan riesgos",
        cronograma: "Cronograma inicial",
      });

    expect(res.status).toBe(200);
  });

  test("Actualizar avance del plan", async () => {
    const res = await request(app)
      .patch(`/projects/${project2}/plan/avance`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        avance: 50,
        notas_seguimiento: "Avance del 50%",
      });

    expect(res.status).toBe(200);
  });
});

//
// 🧨 DELETE PROJECT
//
describe("🧨 DELETE", () => {
  test("Eliminar proyecto #2", async () => {
    const res = await request(app)
      .delete(`/projects/${project2}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
