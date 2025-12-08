import { useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/axios";
import { alertSuccess, alertError } from "../utils/alerts";

export default function CreateEpic() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  async function save() {
    if (!title.trim()) return alertError("El título no puede estar vacío");

    try {
      await api.post(`/projects/${id}/epics`, { title, description });
      alertSuccess("EPIC creada correctamente");
      window.location.href = `/projects/${id}`;
    } catch {
      alertError("Error al crear EPIC");
    }
  }

  return (
    <>
      <style>{`
        .bg {width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;background: radial-gradient(circle,#2d0052,#000);}
        .card { width:450px;padding:40px;background:rgba(15,15,15,.75);border-radius:18px;border:1px solid #333;
                box-shadow:0 0 25px #7c2bff66;color:white; }
        .input, .textarea {
          width:100%;padding:12px;margin-bottom:12px;background:#111;border:1px solid #333;color:white;
          border-radius:10px;
        }
      `}</style>

      <div className="bg">
        <div className="card">
          <h2 style={{textAlign:"center",color:"#d5b6ff"}}>Crear EPIC</h2>

          <input className="input" placeholder="Título" onChange={e => setTitle(e.target.value)} />
          <textarea className="textarea" placeholder="Descripción" onChange={e => setDesc(e.target.value)} />

          <button
            onClick={save}
            style={{
              width:"100%",padding:"12px",border:"none",
              background:"linear-gradient(90deg,#6a00ff,#9a47ff)",color:"white",
              borderRadius:"12px",cursor:"pointer"}}
          >
            Guardar EPIC
          </button>
        </div>
      </div>
    </>
  );
}
