export default function DashboardCard({ icon, text, onClick }: any) {
  return (
    <>
      <style>{`
        .dc {
          width: 240px;
          height: 150px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 20px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: .25s;
        }

        .dc:hover {
          transform: translateY(-6px);
          border-color: #b77bff;
          box-shadow: 0 0 18px #8c2bff55;
        }

        .dc-icon {
          font-size: 34px;
          color: #d6c0ff;
        }

        .dc-text {
          font-size: 18px;
          font-weight: 600;
          color: #e8d8ff;
        }
      `}</style>

      <div className="dc" onClick={onClick}>
        <div className="dc-icon">{icon}</div>
        <div className="dc-text">{text}</div>
      </div>
    </>
  );
}
