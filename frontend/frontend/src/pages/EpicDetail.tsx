import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function EpicDetail() {
  const { epicId } = useParams();
  const [epic, setEpic] = useState<any>(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    api.get(`/epics/${epicId}`).then(res => setEpic(res.data));
    api.get(`/epics/${epicId}/stories`).then(res => setStories(res.data));
  }, [epicId]);

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
        }

        .layout {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f4f5f7;
        }

        /* TOP NAV LIKE JIRA */
        .topbar {
          height: 60px;
          background: #253858;
          display: flex;
          align-items: center;
          padding: 0 20px;
          color: white;
          font-size: 20px;
          font-weight: 600;
          box-shadow: 0 2px 6px #0002;
        }

        .content {
          flex: 1;
          display: flex;
          justify-content: center;
          padding: 40px;
        }

        .epic-container {
          width: 820px;
          background: white;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px #0001;
          border: 1px solid #ddd;
        }

        .epic-title {
          font-size: 28px;
          font-weight: 700;
          color: #172b4d;
          margin-bottom: 10px;
        }

        .epic-description {
          color: #42526e;
          margin-bottom: 30px;
        }

        /* STORIES LIST */
        .story-item {
          background: #ffffff;
          padding: 18px;
          border-radius: 10px;
          margin-bottom: 15px;
          border: 1px solid #e1e4ea;
          transition: 0.2s;
          cursor: pointer;
        }

        .story-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 14px #0002;
          border-color: #7e57ff;
        }

        .story-code {
          font-weight: bold;
          color: #7e57ff;
        }

        /* CREATE STORY BUTTON */
        .create-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #7e57ff;
          padding: 15px 28px;
          border-radius: 50px;
          color: white;
          font-size: 17px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 16px #7e57ff55;
          transition: 0.2s;
        }

        .create-btn:hover {
          transform: translateY(-3px);
          background: #6a46e0;
        }
      `}</style>

      <div className="layout">

        {/* TOP BAR LIKE JIRA */}
        <div className="topbar">
          EPIC — {epic?.title || "Cargando..."}
        </div>

        <div className="content">

          <div className="epic-container">

            <div className="epic-title">{epic?.title}</div>

            <div className="epic-description">{epic?.description}</div>

            <h3 style={{ color: "#344563" }}>Historias</h3>

            {stories.length === 0 && (
              <p style={{ color: "#6b778c" }}>Este epic aún no tiene historias.</p>
            )}

            {stories.map((s: any) => (
              <div
                key={s.id}
                className="story-item"
                onClick={() => (window.location.href = `/stories/${s.id}`)}
              >
                <div className="story-code">{s.code}</div>
                <div style={{ fontSize: "17px", fontWeight: "600" }}>{s.title}</div>
                <div style={{ color: "#6b778c" }}>{s.description}</div>
              </div>
            ))}

          </div>
        </div>

        {/* FLOATING BUTTON */}
        <button
          className="create-btn"
          onClick={() => (window.location.href = `/epics/${epicId}/stories/create`)}
        >
          + Nueva Historia
        </button>

      </div>
    </>
  );
}
