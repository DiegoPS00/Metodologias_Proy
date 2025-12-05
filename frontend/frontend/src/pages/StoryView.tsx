import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function StoryView() {
  const { storyId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get(`/stories/${storyId}/tasks`).then(res => setTasks(res.data));
  }, []);

  return (
    <>
      <style>{`
        .bg {width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background: radial-gradient(circle,#2d0052,#000);}
        .box {width:580px;padding:40px;background:rgba(15,15,15,.75);border-radius:18px;border:1px solid #333;box-shadow:0 0 25px #7c2bff66;color:white;}
        .task {padding:12px;background:#111;border-radius:10px;border:1px solid #333;margin-bottom:12px;color:#e4d2ff;}
      `}</style>

      <div className="bg">
        <div className="box">
          <h2 style={{textAlign:"center",color:"#d5b6ff"}}>Tareas</h2>

          {tasks.map((t:any) => (
            <div key={t.id} className="task">
              {t.completed ? "✔" : "⏳"} {t.task_name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
