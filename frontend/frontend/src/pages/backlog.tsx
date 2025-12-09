import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { alertSuccess, alertError } from "../utils/alerts";

const STATUS = ["Todo", "Doing", "Done"];
const PRIORITY = ["Low", "Medium", "High"];

export default function Backlog() {
  const { id } = useParams(); // project_id
  const [items, setItems] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");

  async function load() {
    const res = await api.get(`/projects/${id}/backlog`);
    setItems(res.data);
  }

  async function add() {
    if (!title.trim())
      return alertError("El título es obligatorio");

    try {
      await api.post(`/projects/${id}/backlog`, {
        title,
        description,
        priority
      });

      alertSuccess("Item agregado al backlog");
      setTitle("");
      setDesc("");
      setPriority("Medium");
      load();
    } catch {
      alertError("Error al registrar");
    }
  }

  async function updateStatus(itemId: number, status: string) {
    await api.patch(`/backlog/${itemId}`, { status });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <style>{`
        .backlog-bg {
          width: 100vw;
          height: 100vh;
          background: #0f0f0f;
          padding-top: 40px;
          display: flex;
          justify-content: center;
        }
        .card {
          width: 900px;
          background: #1c1c1c;
          padding: 20px;
          border-radius: 12px;
          color: white;
          box-shadow: 0 0 20px #0006;
        }
        .input, .select {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          background: #111;
          border: 1px solid #333;
          color: white;
        }
        .btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(90deg,#7a3cff,#9a63ff);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 10px;
          color: white;
          font-weight: bold;
        }
        .item {
          background: #222;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 12px;
          border: 1px solid #333;
        }
        .status-btn {
          padding: 6px 12px;
          margin-right: 8px;
          border-radius: 6px;
          cursor: pointer;
          background: #333;
        }
      `}</style>

      <div className="backlog-bg">
        <div className="card">

          <h2 style={{ marginBottom: "15px" }}>
            Backlog del Proyecto
          </h2>

          <h3 style={{ color: "#c9a7ff" }}>Nuevo elemento</h3>

          <input
            className="input"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="input"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
          />

          <select
            className="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITY.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <button className="btn" onClick={add}>➕ Agregar al backlog</button>

          <hr style={{ margin: "25px 0", borderColor: "#333" }} />

          <h3 style={{ color: "#c9a7ff" }}>Items registrados</h3>

          {items.map((i) => (
            <div className="item" key={i.id}>
              <strong style={{ color: "#d5b6ff" }}>{i.title}</strong>

              <p style={{ color: "#bfaaff" }}>{i.description}</p>

              <p style={{ marginBottom: "10px" }}>
                <b>Prioridad:</b> {i.priority}  
                &nbsp;&nbsp;&nbsp;  
                <b>Estado:</b> {i.status}
              </p>

              <div>
                {STATUS.map((s) => (
                  <span
                    key={s}
                    className="status-btn"
                    onClick={() => updateStatus(i.id, s)}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
