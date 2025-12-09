import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { alertSuccess, alertError } from "../utils/alerts";

export default function ProjectPlan() {
  const { id } = useParams();

  const [plan, setPlan] = useState<any>(null);

  const [objetivo, setObjetivo] = useState("");
  const [alcance, setAlcance] = useState("");
  const [riesgos, setRiesgos] = useState("");
  const [cronograma, setCronograma] = useState("");

  const [avance, setAvance] = useState(0);
  const [notas, setNotas] = useState("");

  // microincrementos
  const [microTitulo, setMicroTitulo] = useState("");
  const [microDesc, setMicroDesc] = useState("");
  const [microList, setMicroList] = useState<any[]>([]);

  async function load() {
    const res = await api.get(`/projects/${id}/plan`);
    setPlan(res.data.plan);
    setMicroList(res.data.micro);

    if (res.data.plan) {
      setObjetivo(res.data.plan.objetivo || "");
      setAlcance(res.data.plan.alcance || "");
      setRiesgos(res.data.plan.riesgos || "");
      setCronograma(res.data.plan.cronograma || "");
      setAvance(res.data.plan.avance || 0);
      setNotas(res.data.plan.notas_seguimiento || "");
    }
  }

  async function savePlan() {
    try {
      await api.post(`/projects/${id}/plan`, {
        objetivo,
        alcance,
        riesgos,
        cronograma,
      });
      alertSuccess("Plan guardado");
      load();
    } catch {
      alertError("Error guardando el plan");
    }
  }

  async function updateAvance() {
    try {
      await api.patch(`/projects/${id}/plan/avance`, {
        avance,
        notas_seguimiento: notas,
      });
      alertSuccess("Avance actualizado");
      load();
    } catch {
      alertError("No se pudo actualizar el avance");
    }
  }

  async function addMicro() {
    if (!microTitulo.trim()) return alertError("Titulo obligatorio");

    try {
      await api.post(`/projects/${id}/microincrementos`, {
        titulo: microTitulo,
        descripcion: microDesc,
      });
      setMicroTitulo("");
      setMicroDesc("");
      alertSuccess("Microincremento registrado");
      load();
    } catch {
      alertError("No se pudo registrar");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <style>{`
        .cont {
          padding: 40px;
          max-width: 900px;
          margin: auto;
          color: white;
        }
        textarea, input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          background: #111;
          border: 1px solid #333;
          color: white;
          margin-bottom: 10px;
        }
        .btn {
          padding: 12px;
          width: 100%;
          background: linear-gradient(90deg,#7a3cff,#b084ff);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: white;
          font-weight: bold;
          margin-top: 15px;
        }
        .micro {
          background: #1a1a1a;
          padding: 12px;
          border-radius: 10px;
          margin-top: 10px;
          border: 1px solid #333;
        }
      `}</style>

      <div className="cont">
        <h1>Plan del Proyecto</h1>

        <h3>Definición del plan (HU-003)</h3>
        <textarea placeholder="Objetivo" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} />
        <textarea placeholder="Alcance" value={alcance} onChange={(e) => setAlcance(e.target.value)} />
        <textarea placeholder="Riesgos" value={riesgos} onChange={(e) => setRiesgos(e.target.value)} />
        <textarea placeholder="Cronograma general" value={cronograma} onChange={(e) => setCronograma(e.target.value)} />

        <button className="btn" onClick={savePlan}>Guardar plan</button>

        <hr style={{ margin: "30px 0", borderColor: "#333" }} />

        <h3>Seguimiento y avance (HU-004)</h3>
        <input 
          type="number" 
          placeholder="Avance %" 
          value={avance}
          onChange={(e) => setAvance(parseInt(e.target.value))}
        />
        <textarea 
          placeholder="Notas de seguimiento"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <button className="btn" onClick={updateAvance}>Actualizar avance</button>

        <hr style={{ margin: "30px 0", borderColor: "#333" }} />

        <h3>Microincrementos (HU-005)</h3>
        <input 
          placeholder="Título del microincremento"
          value={microTitulo}
          onChange={(e) => setMicroTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descripción del microincremento"
          value={microDesc}
          onChange={(e) => setMicroDesc(e.target.value)}
        />

        <button className="btn" onClick={addMicro}>Registrar microincremento</button>

        {microList.map((m) => (
          <div className="micro" key={m.id}>
            <b>{m.titulo}</b> <br />
            {m.descripcion} <br />
            <small>{new Date(m.fecha).toLocaleString()}</small>
          </div>
        ))}

      </div>
    </>
  );
}
