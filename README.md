# Seminario_Proy: Sistema de Gestión de Proyectos OpenUP

##Descripción del Proyecto
Aplicación web diseñada para la gestión integral de proyectos de desarrollo de software bajo la metodología **OpenUP** (Unified Process), integrando prácticas de ingeniería **XP** (Extreme Programming).

El sistema permite administrar el ciclo de vida completo del software a través de sus cuatro fases: **Inicio, Elaboración, Construcción y Transición**, facilitando el seguimiento de entregables y la colaboración del equipo.

##Tecnologías (Tech Stack)
Este proyecto utiliza una arquitectura **MERN** modernizada con TypeScript:

* **Frontend:** React + Vite (TypeScript)
* **Backend:** Node.js + Express (TypeScript)
* **Base de Datos:** MySQL / MariaDB
* **Estilos:** Material UI / Tailwind CSS
* **Calidad de Código:** ESLint, Prettier
* **Testing:** Vitest (Front) / Jest (Back)

##Equipo de Desarrollo (Scrum Team)

| Nombre | Rol Scrum | Responsabilidad |
| **Emilio Alejandro García del Alto** | Product Owner | Gestión del backlog y validación de entregables. |
| **Diego Pérez Salas** | Scrum Master | Facilitador y eliminación de impedimentos. |
| **Alexis Oswaldo Valdez Olmos** | Desarrollador | Codificación Frontend/Backend y pruebas. |
| **Osmar Enrique Martínez López** | Desarrollador | Codificación Frontend/Backend y documentación. |
| **Fabiel Ortega Ruiz** | Diseñador UI / Dev | Prototipado, UX y desarrollo de interfaz. |

##Instalación y Configuración (Dev Environment)

### Prerrequisitos
* [cite_start]Node.js v18+ [cite: 198]
* MySQL o MariaDB

### Pasos Iniciales
1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/EmilioCarDala/Seminario_Proy.git](https://github.com/EmilioCarDala/Seminario_Proy.git)
    ```
2.  **Instalar dependencias:**
    *(Dependiendo de la estructura de carpetas, ej: client/server)*
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```
3.  **Ejecutar entorno local:**
    ```bash
    npm run dev
    ```

##Metodología
El desarrollo sigue un enfoque híbrido **Scrum-XP**:
* **Sprints:** 2 semanas.
* **Gestión:** Jira + GitHub Projects.
* **CI/CD:** GitHub Actions.
