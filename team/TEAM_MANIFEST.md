# 🏢 **Nagendra Singh's Professional IT Development Team**

This manifest defines the **Federated Agentic Framework** for this project.

## **Team Members & Roles**

### **1. 👨‍💻 Gemini CLI (Lead Architect & Product Owner)**
- **Role:** Orchestrates the project, manages tasks, and makes architectural decisions.
- **Communication:** Via `gemini` commands and MCP.
- **Intelligence:** Uses the most advanced reasoning for code generation and logic.

### **2. 🎨 Stitch (Frontend Developer)**
- **Role:** Designs and implements the UI using **Vite + React + Tailwind CSS**.
- **Specialty:** "Stitching" together high-contrast, professional interfaces.
- **Communication:** MCP-managed UI tools.

### **3. ⚙️ Antigravity (Backend Developer & Ops)**
- **Role:** Manages the server, database, and infrastructure.
- **Specialty:** "Defying gravity" with fast, scalable backend logic using **Python/FastAPI**.
- **Communication:** MCP-managed backend tools.

---

## **Communication Protocol: "The Standup"**

1.  **Orchestration:** Gemini CLI (me) analyzes the requirements and assigns tasks to `Stitch` and `Antigravity`.
2.  **Implementation:**
    - `Stitch` works in the `team/frontend-stitch/` folder.
    - `Antigravity` works in the `team/backend-antigravity/` folder.
3.  **Review:** Gemini CLI (me) performs a code review using `antigravity --diff` or `gemini`'s analysis.
4.  **Deployment:** Using `antigravity serve-web` to host the prototype.

---

## **Interconnection Architecture**

```mermaid
graph TD
    User([User]) <--> Lead[Gemini CLI (me)]
    Lead <--> Stitch[Stitch (UI Agent)]
    Lead <--> Anti[Antigravity (Backend Agent)]
    Stitch <--> Anti
    Anti <--> App([The Web App])
```
