import { useState } from "react";
import { api } from "../api/axios";
import { alertSuccess, alertError, confirmAction } from "../utils/alerts";

export default function CreateProject() {
  const [name, setName] = useState("");

  async function create() {
    if (!name.trim()) {
      return alertError("El nombre del proyecto no puede estar vacío");
    }

    try {
      await api.post("/projects/create", { name });

      // 🔥 AQUÍ ESTÁ LA SOLUCIÓN
      await alertSuccess("Proyecto creado correctamente");

      window.location.href = "/projects";
    } catch (err) {
      alertError("Error al crear el proyecto");
    }
  }

  async function logout() {
    const conf = await confirmAction("¿Deseas cerrar sesión?");
    if (!conf.isConfirmed) return;

    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <style>{`
        .cp-bg {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 50% 20%, #2d0052 0%, #000 70%);
        }

        .cp-card {
          width: 480px;
          padding: 40px;
          background: rgba(15,15,15,0.75);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid #333;
          box-shadow: 0 0 25px #7c2bff66;
          position: relative;
        }

        .top-bar {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          justify-content: space-between;
        }

        .icon-btn {
          width: 42px;
          height: 42px;
          background: #111;
          border: 1px solid #333;
          border-radius: 10px;
          font-size: 20px;
          color: #d5b6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .25s;
        }

        .icon-btn:hover {
          background: #1a1a1a;
          border-color: #8e37ff;
          transform: translateY(-2px);
        }

        .cp-input {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid #333;
          background: #111;
          color: #fff;
          margin-bottom: 20px;
          font-size: 17px;
        }

        .cp-button {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg,#6a00ff,#9a47ff);
          color: #fff;
          cursor: pointer;
          font-size: 18px;
        }
      `}</style>

      <div className="cp-bg">
        <div className="cp-card">

          <div className="top-bar">
            <div className="icon-btn" onClick={() => history.back()}>←</div>
            <div className="icon-btn" onClick={logout}>⛔</div>
          </div>

          <h2 style={{ textAlign: "center", color: "#d5b6ff" }}>Crear Proyecto</h2>

          <input
            className="cp-input"
            placeholder="Nombre del proyecto"
            onChange={(e) => setName(e.target.value)}
          />

          <button className="cp-button" onClick={create}>
            Crear
          </button>
        </div>
      </div>
    </>
  );
}
