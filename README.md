# Workshop Profile App — Full Stack (React + Spring Boot)

A full-stack web application faithfully recreating the workshop/profile dashboard design.

---

## 📸 Architecture & Design Highlights

- **Frontend:** React 18 + TypeScript + Vite (instant HMR, pixel-accurate styling)
- **Backend:** Spring Boot 3.2 + Spring Data JPA + H2 in-memory database + Lombok + CORS configuration
- **Data model:**
  - `UserProfile`: Alex Morgan (@alexmakes), avatar, bio, location, join date, credits, badges
  - `Project`: "The listening bench" (Prototype study) + "Small places. Shared stories." (Field Notes)
  - `Post`: "A park bench that brings people together." (Tech), plus community design & research posts
- **Interactive features:**
  - Responsive layout (matching screenshot)
  - Live activity tabs (Posts / Comments / Supporting)
  - "Edit profile" interactive modal with instantaneous update & backend synchronization
  - Graceful fallback: Frontend runs flawlessly both standalone and when connected to Spring Boot

---

## 🚀 Running the Project

### 1. Frontend (React + Vite)

The frontend is already built and ready:

```powershell
cd "frontend"
npm run dev
```

App is accessible at: **[http://localhost:3000](http://localhost:3000)**

---

### 2. Backend (Spring Boot 3.2, Java 21)

You can run the backend using any of the following methods:

#### Option A: Run via your IDE (Recommended)
1. Open the `backend` folder in **IntelliJ IDEA**, **VS Code** (with Java extensions), or **Eclipse**.
2. Locate `src/main/java/com/workshop/WorkshopBackendApplication.java`.
3. Click the green **Run** / **Play** button.

#### Option B: Run with Maven
```powershell
cd "backend"
mvn spring-boot:run
```

- API Base URL: **`http://localhost:8080/api`**
- H2 Database Console: **`http://localhost:8080/h2-console`**
  - JDBC URL: `jdbc:h2:mem:workshopdb`
  - Username: `sa`
  - Password: *(empty)*

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profile/1` | Fetch profile details |
| `GET` | `/api/profile/username/{username}` | Fetch profile by handle (`alexmakes`) |
| `PUT` | `/api/profile/1` | Update name, bio, location |
| `GET` | `/api/profile/1/projects` | Fetch workbench items |
| `GET` | `/api/profile/1/posts` | Fetch activity feed posts |
| `GET` | `/api/stats` | Summary stats (credits, posts, comments) |
