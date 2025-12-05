import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function PhaseView() {
  const { id, phaseId } = useParams();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    api.get(`/projects/${id}/phases/${phaseId}/stories`).then(res => setStories(res.data));
  }, []);

  return (
    <>
      <style>{`
        .bg { width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background: radial-gradient(circle,#2d0052,#000);}
        .box { width:580px;padding:40px;background:rgba(15,15,15,.75);border-radius:18px;border:1px solid #333;box-shadow:0 0 25px #7c2bff66;color:white;position:relative;}
        .item {padding:12px;background:#111;border-radius:10px;border:1px solid #333;margin-bottom:12px;cursor:pointer;transition:.25s;}
        .item:hover {background:#1a1a1a; border-color:#8e37ff; transform:scale(1.03);}
      `}</style>

      <div className="bg">
        <div className="box">
          <h2 style={{textAlign:"center", color:"#d5b6ff"}}>Historias de Usuario</h2>

          {stories.map((s:any) => (
            <div
              key={s.id}
              className="item"
              onClick={() => (window.location.href = `/stories/${s.id}`)}
            >
              📝 {s.code} — {s.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
