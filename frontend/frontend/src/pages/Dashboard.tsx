export default function Dashboard() {
  return (
    <>
      <style>{`
        .dash-bg {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 50% 20%, #2d0052 0%, #000 70%);
          animation: fadeBg 1.5s ease forwards;
        }

        @keyframes fadeBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .dash-card {
          width: 420px;
          padding: 40px;
          border-radius: 18px;
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 25px rgba(130, 0, 255, 0.25);
          text-align: center;
          animation: slideUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(40px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dash-title {
          color: #c58aff;
          font-size: 30px;
          margin-bottom: 25px;
          font-weight: 700;
          text-shadow: 0 0 12px rgba(180, 0, 255, 0.5);
        }

        .dash-link {
          display: block;
          margin: 12px 0;
          padding: 12px;
          color: #d8c8ff;
          font-size: 18px;
          text-decoration: none;
          border-radius: 10px;
          background: #111;
          border: 1px solid #333;
          transition: .25s ease;
        }

        .dash-link:hover {
          background: #1a1a1a;
          border-color: #8e37ff;
          box-shadow: 0 0 12px #8e37ff55;
          transform: scale(1.03);
        }

        .logout-btn {
          width: 100%;
          margin-top: 20px;
          padding: 14px;
          font-size: 17px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          background: #ef4444;
          color: #fff;
          font-weight: 600;
          transition: .25s ease;
          box-shadow: 0 0 18px #ff2b2b55;
        }

        .logout-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 28px #ff2b2baa;
        }

        .logout-btn:active {
          transform: scale(0.96);
        }
      `}</style>

      <div className="dash-bg">
        <div className="dash-card">
          <h1 className="dash-title">Panel de Control</h1>

          <a href="/projects" className="dash-link">📁 Ver proyectos</a>

          <a href="/projects/create" className="dash-link">➕ Crear proyecto</a>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}
