import Sidebar from "../pages/Sidebar";
import DashboardCard from "../pages/DashboardCard";

export default function Dashboard() {
  return (
    <>
      <style>{`
        .dash {
          width: 100vw;
          height: 100vh;
          display: flex;
          background: radial-gradient(circle at 50% 0%, #3a0066 0%, #000 70%);
          color: white;
        }

        .dash-main {
          flex: 1;
          padding: 60px;
        }

        .dash-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 25px;
          color: #e9d4ff;
        }

        .dash-cards {
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
        }
      `}</style>

      <div className="dash">
        <Sidebar />

        <div className="dash-main">
          <h1 className="dash-title">Panel Principal</h1>

          <div className="dash-cards">

            <DashboardCard 
              icon="📁"
              text="Mis Proyectos"
              onClick={() => window.location.href="/projects"}
            />

            <DashboardCard 
              icon="➕"
              text="Nuevo Proyecto"
              onClick={() => window.location.href="/projects/create"}
            />

           
            <DashboardCard 
              icon="📌"
              text="Board (Kanban)"
              onClick={() => window.location.href="/board"}
            />

          

            <DashboardCard 
              icon="📚"
              text="Artefactos"
              onClick={() => window.location.href="/artifacts"}
            /><DashboardCard
  icon="🧪"
  text="Pruebas Unitarias"
  onClick={() => (window.location.href = "/tests")}
 />

            <DashboardCard 
              icon="📊"
              text="Reportes"
              onClick={() => window.location.href="/reports"}
            />

          </div>
        </div>
      </div>
    </>
  );
}
