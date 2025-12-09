import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { confirmAction } from "../utils/alerts";

export default function Microincrements() {
  const { id } = useParams();
  const [list, setList] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Cargar microincrementos
  const load = async () => {
    setLoading(true);
    const res = await api.get(`/microincrements/${id}`);
    setList(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  // Crear microincremento
  const create = async () => {
    if (!title.trim()) return alert("El título es obligatorio");

    await api.post("/microincrements/", {
      project_id: id,
      title,
      description,
      progress,
    });

    setTitle("");
    setDescription("");
    setProgress(0);
    load();
  };

  // Actualizar progreso
  const updateProgress = async (mid: number, newValue: number) => {
    await api.put(`/microincrements/${mid}/progress`, { progress: newValue });
    load();
  };

  return (
    <>
      <style>{`
        .bg {
          width: 100vw;
          min-height: 100vh;
          background: radial-gradient(circle at 50% 0%, #380066 0%, #000 70%);
          padding: 50px 0;
          display: flex;
          justify-content: center;
        }

        .card {
          width: 900px;
          background: rgba(20,20,20,0.75);
          padding: 35px;
          border-radius: 18px;
          border: 1px solid #2a2a2a;
          backdrop-filter: blur(10px);
          color: white;
          box-shadow: 0 0 40px #7c2bff33;
          animation: fadeIn .4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .item {
          background: #141414;
          border: 1px solid #333;
          padding: 18px;
          border-radius: 14px;
          margin-bottom: 14px;
          transition: 0.25s;
        }

        .item:hover {
          border-color: #8f45ff;
          transform: scale(1.02);
          box-shadow: 0 0 12px #8f45ff55;
        }

        .title-input,
        .desc-input {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: 1px solid #333;
          background: #111;
          color: white;
        }

        .btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg,#7b2fff,#b46aff);
          border: none;
          border-radius: 14px;
          margin-top: 8px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: .25s;
        }

        .btn:hover {
          opacity: .9;
          transform: translateY(-3px);
          box-shadow: 0 0 16px #a55cff55;
        }

        .back-btn {
          padding: 10px 20px;
          margin-bottom: 20px;
          border-radius: 10px;
          background: #181818;
          color: #cbaaff;
          border: 1px solid #333;
          cursor: pointer;
          transition: 0.2s;
        }

        .back-btn:hover {
          background: #262626;
          border-color: #7d3cff;
          transform: translateY(-2px);
        }

        .progress-input {
          width: 100%;
        }
      `}</style>

      <div className="bg">
        <div className="card">

          <button className="back-btn" onClick={() => history.back()}>
            ← Volver
          </button>

          <h2 style={{ textAlign: "center", color: "#e5d0ff", marginBottom: "20px" }}>
            ⚡ Microincrementos del Proyecto
          </h2>

          {/* FORMULARIO */}
          <input
            className="title-input"
            placeholder="Título del microincremento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="desc-input"
            placeholder="Descripción (opcional)"
            value={description}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Progreso inicial: {progress}%</label>
          <input
            type="range"
            min={0}
            max={100}
            className="progress-input"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />

          <button className="btn" onClick={create}>
            + Crear Microincremento
          </button>

          <hr style={{ margin: "25px 0", borderColor: "#333" }} />

          {/* LISTA */}
          {loading ? (
            <p>Cargando...</p>
          ) : (
            list.map((m: any) => (
              <div className="item" key={m.id}>
                <strong style={{ fontSize: 16, color: "#d9c2ff" }}>{m.title}</strong>
                <p style={{ color: "#cfc3ff" }}>{m.description}</p>

                <label>Progreso: {m.progress}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="progress-input"
                  value={m.progress}
                  onChange={(e) =>
                    updateProgress(m.id, Number(e.target.value))
                  }
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
