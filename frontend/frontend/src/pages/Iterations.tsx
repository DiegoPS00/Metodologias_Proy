import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { alertSuccess, alertError } from "../utils/alerts";

export default function Iterations() {
  const { id } = useParams();
  const [list, setList] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  async function load() {
    const res = await api.get(`/projects/${id}/iteraciones`);
    setList(res.data);
  }

  async function crear() {
    if (!nombre.trim()) return alertError("El nombre es obligatorio");

    try {
      await api.post(`/projects/${id}/iteraciones`, {
        nombre,
        objetivo,
        fecha_inicio: inicio,
        fecha_fin: fin,
      });
      alertSuccess("Iteración creada");
      setNombre("");
      setObjetivo("");
      setInicio("");
      setFin("");
      load();
    } catch {
      alertError("No se pudo crear la iteración");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <style>{`
        .iter-bg {
          width: 100vw;
          min-height: 100vh;
          padding-top: 40px;
          background: radial-gradient(circle at 50% 0%, #3a0066 0%, #000 80%);
          color: white;
          display: flex;
          justify-content: center;
        }

        .iter-card {
          width: 750px;
          background: rgba(20, 20, 20, 0.75);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid #2a2a2a;
          box-shadow: 0 0 40px #7c2bff55;
          backdrop-filter: blur(12px);
          animation: fadeIn .4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .input {
          width: 100%;
          padding: 12px;
          background: #111;
          border: 1px solid #333;
          border-radius: 12px;
          margin-bottom: 12px;
          color: #eee;
        }

        .textarea {
          width: 100%;
          padding: 12px;
          background: #111;
          border: 1px solid #333;
          border-radius: 12px;
          margin-bottom: 12px;
          color: #eee;
          min-height: 90px;
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg, #7b2fff, #b46aff);
          border: none;
          border-radius: 14px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          color: white;
          font-size: 16px;
          transition: .25s;
        }

        .btn-primary:hover {
          opacity: .9;
          transform: translateY(-3px);
          box-shadow: 0 0 16px #a55cff70;
        }

        .iter-item {
          padding: 18px;
          background: #1c1c1c;
          border: 1px solid #333;
          border-radius: 14px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: .25s;
        }

        .iter-item:hover {
          background: #242424;
          border-color: #9d5cff;
          transform: scale(1.03);
          box-shadow: 0 0 18px #7a3cff55;
        }

        .status-pill {
          display: inline-block;
          padding: 4px 10px;
          background: #7b2fff44;
          border-radius: 8px;
          font-size: 12px;
          color: #d8c2ff;
          border: 1px solid #7b2fff88;
          margin-top: 5px;
        }
      `}</style>

      <div className="iter-bg">
        <div className="iter-card">
          <h1 style={{ textAlign: "center", color: "#e1c9ff", marginBottom: 25 }}>
            ⏱ Iteraciones del Proyecto
          </h1>

          {/* FORMULARIO */}
          <h3 style={{ color: "#cfaaff", marginBottom: 10 }}>Crear nueva iteración</h3>

          <input
            className="input"
            placeholder="Nombre de la Iteración"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <textarea
            className="textarea"
            placeholder="Objetivo de la Iteración"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
          />

          <input
            type="date"
            className="input"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />

          <input
            type="date"
            className="input"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
          />

          <button className="btn-primary" onClick={crear}>
            ➕ Crear Iteración
          </button>

          <hr style={{ margin: "35px 0", borderColor: "#333" }} />

          <h3 style={{ color: "#cfaaff" }}>Iteraciones registradas</h3>

          {list.length === 0 && (
            <p style={{ textAlign: "center", marginTop: 20, color: "#c9a7ff" }}>
              No hay iteraciones todavía.
            </p>
          )}

          {list.map((it) => (
            <div
              key={it.id}
              className="iter-item"
              onClick={() => (window.location.href = `/iteraciones/${it.id}`)}
            >
              <strong style={{ fontSize: 18, color: "#e5d7ff" }}>{it.nombre}</strong>
              <br />
              <small style={{ color: "#bfaaff" }}>{it.objetivo || "Sin objetivo"}</small>
              <br />
              <span className="status-pill">{it.estado}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
