export default function Sidebar() {
  return (
    <>
      <style>{`
        .sb {
          width: 250px;
          height: 100vh;
          background: #0d0d0d;
          border-right: 1px solid #2a2a2a;
          padding: 25px 15px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .sb-title {
          color: #caa7ff;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .sb-item {
          color: #ddd;
          padding: 12px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: .2s;
          font-size: 16px;
        }

        .sb-item:hover {
          background: #1a1a1a;
          transform: translateX(5px);
          color: #b77bff;
        }

        .sb-footer {
          margin-top: auto;
          padding: 12px;
          color: #ff7373;
          background: #1a0000;
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          border: 1px solid #330000;
        }

        .sb-footer:hover {
          background: #2a0000;
        }
      `}</style>

      <div className="sb">
        <div className="sb-title">OpenUp</div>

        <div className="sb-item" onClick={() => (window.location.href = "/dashboard")}>🏠 Dashboard</div>
        <div className="sb-item" onClick={() => (window.location.href = "/projects")}>📁 Proyectos</div>
        <div className="sb-item" onClick={() => (window.location.href = "/projects/create")}>➕ Nuevo Proyecto</div>
        <div className="sb-item" onClick={() => (window.location.href = "/backlog")}>📝 Backlog</div>
        <div className="sb-item" onClick={() => (window.location.href = "/board")}>📌 Board (Kanban)</div>
        <div className="sb-item" onClick={() => (window.location.href = "/iterations")}>⏱ Iteraciones</div>
        <div className="sb-item" onClick={() => (window.location.href = "/artifacts")}>📚 Artefactos</div>
        <div className="sb-item" onClick={() => (window.location.href = "/reports")}>📊 Reportes</div>

        <div className="sb-footer" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>
          ⛔ Cerrar sesión
        </div>
      </div>
    </>
  );
}
