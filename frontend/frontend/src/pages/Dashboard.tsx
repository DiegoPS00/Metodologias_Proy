export default function Dashboard() {
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <style>{`
        body {
          background: #0a0a0a;
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
        }

        .container {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 80px;
          background: radial-gradient(circle at 50% 0%, #3a0066 0%, #000 70%);
          color: #eee;
          animation: fade 1s ease;
        }

        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 30px;
          letter-spacing: 1px;
          color: #e9d4ff;
        }

        /* Tarjetas */
        .cards {
          display: flex;
          gap: 25px;
        }

        .card {
          width: 230px;
          height: 140px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 18px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(14px);
          cursor: pointer;
          transition: 0.25s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 25px rgba(140, 0, 255, 0.35);
          border-color: #9f4dff;
        }

        .card-icon {
          font-size: 32px;
          opacity: 0.9;
        }

        .card-text {
          font-size: 18px;
          font-weight: 600;
          color: #f1e8ff;
        }

        /* Logout */
        .logout {
          margin-top: 50px;
          padding: 12px 25px;
          font-size: 17px;
          background: #c62828;
          color: white;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: 0.25s;
        }

        .logout:hover {
          background: #ff4343;
        }

      `}</style>

      <div className="container">
        <h1 className="title">Panel Principal</h1>

        <div className="cards">

          <div
            className="card"
            onClick={() => window.location.href = "/projects"}
          >
            <div className="card-icon">📁</div>
            <div className="card-text">Mis proyectos</div>
          </div>

          <div
            className="card"
            onClick={() => window.location.href = "/projects/create"}
          >
            <div className="card-icon">➕</div>
            <div className="card-text">Nuevo proyecto</div>
          </div>

        </div>

        <button className="logout" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
