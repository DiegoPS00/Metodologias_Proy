import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function UnitTests() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runTests() {
    setLoading(true);
    try {
      const res = await api.get("/tests/run");
      setResults(res.data);
    } catch (err) {
      alert("Error al ejecutar pruebas");
    }
    setLoading(false);
  }

  return (
    <>
      <style>{`
        .test-bg {
          min-height: 100vh;
          padding-top: 40px;
          background: radial-gradient(circle at 50% 0%, #550077 0%, #000 80%);
          display: flex;
          justify-content: center;
          color: white;
        }

        .test-card {
          width: 800px;
          background: rgba(20,20,20,0.75);
          border-radius: 18px;
          padding: 40px;
          border: 1px solid #333;
          box-shadow: 0 0 25px #7c2bff88;
          backdrop-filter: blur(10px);
          animation: fadeIn .4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-run {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg,#9a2bff,#d066ff);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          cursor: pointer;
          font-weight: bold;
          color: white;
          margin-bottom: 20px;
          transition: .25s;
        }

        .btn-run:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 15px #d066ff55;
        }

        .result {
          background: #111;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #333;
        }

        .ok { color: #7bff9f; font-weight: bold; }
        .fail { color: #ff7676; font-weight: bold; }

      `}</style>

      <div className="test-bg">
        <div className="test-card">
          <h1 style={{ textAlign: "center", color: "#eecfff" }}>🧪 Pruebas Unitarias</h1>

          <button className="btn-run" onClick={runTests} disabled={loading}>
            {loading ? "Ejecutando..." : "▶ Ejecutar pruebas"}
          </button>

          {results && (
            <>
              <h3 style={{ color: "#cfaaff" }}>Resultados:</h3>
              {results.tests.map((t: any) => (
                <div className="result" key={t.name}>
                  <strong>{t.name}</strong>
                  <br />
                  Estado: <span className={t.success ? "ok" : "fail"}>
                    {t.success ? "✔ Aprobada" : "✘ Falló"}
                  </span>
                  <br />
                  {t.error && <small>{t.error}</small>}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
