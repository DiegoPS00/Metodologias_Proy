import path from "path";
import { exec } from "child_process";
import fs from "fs";

export async function runAllTests(): Promise<any> {
  return new Promise((resolve) => {
    const output = path.join(__dirname, "../../test-results.json");

    // Borrar archivo previo
    if (fs.existsSync(output)) fs.unlinkSync(output);

    const cmd = `npm test -- --json --outputFile="${output}" --passWithNoTests`;

    console.log("🔥 Ejecutando Jest:", cmd);

    exec(cmd, { cwd: path.join(__dirname, "../../") }, (err, stdout, stderr) => {
      console.log("📌 STDOUT:", stdout);
      console.log("📌 STDERR:", stderr);

      if (err) {
        return resolve({
          success: false,
          message: "Error ejecutando Jest",
          error: stderr || err.message,
        });
      }

      if (!fs.existsSync(output)) {
        return resolve({
          success: false,
          message: "No se pudo generar test-results.json",
        });
      }

      try {
        const txt = fs.readFileSync(output, "utf8");
        const json = JSON.parse(txt);

        const tests = json.testResults.map((t: any) => ({
          name: t.name,
          success: t.status === "passed",
          error: t.failureMessage || null,
        }));

        resolve({
          success: true,
          total: tests.length,
          passed: tests.filter((t) => t.success).length,
          failed: tests.filter((t) => !t.success).length,
          tests,
        });
      } catch (err) {
        resolve({
          success: false,
          message: "Error leyendo resultados",
          error: `${err}`,
        });
      }
    });
  });
}
