import { Router } from "express";
import { exec } from "child_process";
import path from "path";

export const routerTests = Router();

routerTests.get("/tests/run", (req, res) => {
  console.log("🔥 Ejecutando pruebas unitarias...");

  const outputFile = path.join(__dirname, "../../test-results.json");

  const command = `npm test -- --json --outputFile="${outputFile}"`;

  console.log("📌 Ejecutando comando:", command);

  exec(command, (error, stdout, stderr) => {
    console.log("📌 STDOUT:", stdout);
    console.log("📌 STDERR:", stderr);

    if (error) {
      console.error("❌ Error ejecutando pruebas:", error);
      return res.status(500).json({
        success: false,
        message: "Error ejecutando Jest",
        error: stderr || error.message,
      });
    }

    try {
      console.log("📌 Leyendo archivo de resultados:", outputFile);

      delete require.cache[require.resolve("../../test-results.json")];
      const results = require("../../test-results.json");

      const formatted = results.testResults.map((t: any) => ({
        name: t.name,
        success: t.status === "passed",
        error: t.failureMessage || null,
      }));

      return res.json({
        success: true,
        tests: formatted,
      });

    } catch (err) {
      console.error("❌ Error leyendo test-results.json:", err);
      return res.status(500).json({
        success: false,
        message: "No se pudieron leer los resultados",
      });
    }
  });
});
