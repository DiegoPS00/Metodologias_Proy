import { useState } from "react";
import { api } from "../api/axios";
import { alertSuccess, alertError } from "../utils/alerts";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  async function login() {
    try {
      const res = await api.post("/auth/login", { username, password });

      alertSuccess("Inicio de sesión exitoso");
      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";
    } catch (error) {
      alertError("Verifica tus datos");
    }
  }

  return (
    <>
      {/* 💜 Tus estilos completos tal cual estaban */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        body {
          background: #000;
        }

        .bg {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 50% 20%, #3a0066 0%, #000 70%);
          animation: fadeBg 1.5s ease forwards;
        }

        @keyframes fadeBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .card {
          width: 360px;
          padding: 40px;
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 18px;
          box-shadow: 0 0 25px rgba(130, 0, 255, 0.2);
          animation: slideUp 0.7s ease forwards;
          opacity: 0;
          transform: translateY(40px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .title {
          text-align: center;
          margin-bottom: 25px;
          color: #c58aff;
          font-size: 28px;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(160, 0, 255, 0.6);
        }

        .input {
          width: 100%;
          padding: 14px 15px;
          margin-bottom: 18px;
          border-radius: 12px;
          background: #111;
          border: 1px solid #333;
          color: #fff;
          font-size: 16px;
          transition: 0.25s ease;
        }

        .input::placeholder {
          color: #777;
        }

        .input:focus {
          outline: none;
          border-color: #8e37ff;
          box-shadow: 0 0 12px #8e37ff55;
          background: #0d0d0d;
          transform: scale(1.03);
        }

        .button {
          width: 100%;
          padding: 14px;
          margin-top: 5px;
          border-radius: 12px;
          background: linear-gradient(90deg, #6a00ff, #9a47ff);
          border: none;
          color: #fff;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.25s ease;
          box-shadow: 0 0 18px #7c2bff55;
        }

        .button:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 28px #7c2bffaa;
        }

        .button:active {
          transform: scale(0.96);
        }

        .reg-btn {
          margin-top: 12px;
          background: transparent;
          border: 1px solid #9c4dff;
          color: #d3b2ff;
          box-shadow: none;
        }

        .reg-btn:hover {
          background: rgba(150, 0, 255, 0.15);
          transform: translateY(-3px);
        }
      `}</style>

      <div className="bg">
        <div className="card">
          <h2 className="title">Bienvenido</h2>

          <input
            className="input"
            placeholder="Usuario"
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Contraseña"
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="button" onClick={login}>
            Ingresar
          </button>

          <button className="button reg-btn" onClick={() => window.location.href = "/register"}>
            Registrarse
          </button>
        </div>
      </div>
    </>
  );
}
