# ReuniteFind — Find Lost People

ReuniteFind is a full-stack web application for reporting and tracking missing-person cases. It provides authentication, case CRUD, search/filtering, status tracking, camera/photo capture, a dashboard, and seeded demo data.

## Stack

- **Frontend:** React 19 components inside Next.js App Router
- **Framework/runtime:** Next.js 16.2.6
- **Styling:** Tailwind CSS 4
- **Backend:** Next.js API routes (Node.js)
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication:** bcryptjs + jose (HTTP-only JWT cookie)

## Requirements

- Node.js 20+ (Node 22 works)
- PostgreSQL running locally
- npm

## 1. Install dependencies

```bash
npm install
```

## 2. Create the local database

Open PostgreSQL:

```bash
psql -U postgres
```

Create the database:

```sql
CREATE DATABASE find_db;
```

Exit:

```sql
\q
```

## 3. Configure environment variables

Create `.env.local` in the project root:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/find_db
AUTH_SECRET=change-this-for-local-development
```

Do not commit `.env.local` or `.env`.

## 4. Create the database schema

Preferred method:

```bash
npx drizzle-kit push
```

If the Drizzle CLI stops while pulling the schema and the database is still empty, create the two application tables manually in `find_db` using the SQL below.

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lost_persons (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(160) NOT NULL,
  age INTEGER,
  gender VARCHAR(20),
  height VARCHAR(40),
  complexion VARCHAR(60),
  identifying_marks TEXT,
  photo_url TEXT,
  last_seen_location VARCHAR(240),
  last_seen_date VARCHAR(40),
  clothing_description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'missing',
  description TEXT,
  reporter_name VARCHAR(160),
  reporter_relation VARCHAR(80),
  contact_phone VARCHAR(60),
  contact_email VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS lost_persons_user_idx
  ON lost_persons(user_id);

CREATE INDEX IF NOT EXISTS lost_persons_status_idx
  ON lost_persons(status);
```

Verify the tables:

```bash
psql -U postgres -d find_db
```

```sql
\dt
```

You should see `users` and `lost_persons`.

## 5. Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 6. Load the demo data

The app includes a seed API route. It creates the demo user if needed and inserts the demo case records.

With the development server running, open a second terminal and run:

### PowerShell

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/seed" -Method POST
```

### curl

```bash
curl -X POST http://localhost:3000/api/seed
```

Demo account:

| Email | Password |
| --- | --- |
| `demo@findlost.app` | `demo1234` |

You can also use the **Explore live demo** button on the login screen.

## Features

- Email/password registration and login
- HTTP-only JWT sessions
- Password hashing with bcrypt
- Create, read, update, and delete reports
- Search by name/location
- Status filters: `missing`, `investigating`, `found`
- Dashboard statistics
- Camera capture / image upload
- Responsive dashboard with collapsible mobile navigation
- Demo seeding endpoint
- Health-check endpoint

## Project structure

```text
src/
├─ app/
│  ├─ api/
│  │  ├─ auth/
│  │  │  ├─ register/route.ts
│  │  │  ├─ login/route.ts
│  │  │  ├─ logout/route.ts
│  │  │  └─ me/route.ts
│  │  ├─ persons/route.ts
│  │  ├─ persons/[id]/route.ts
│  │  ├─ stats/route.ts
│  │  ├─ seed/route.ts
│  │  └─ health/route.ts
│  ├─ dashboard/
│  ├─ page.tsx
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ AuthProvider.jsx
│  ├─ HomeClient.jsx
│  ├─ DashboardShell.jsx
│  ├─ Overview.jsx
│  ├─ PersonsList.jsx
│  ├─ PersonForm.jsx
│  ├─ PersonDetail.jsx
│  ├─ PersonEdit.jsx
│  ├─ CameraCapture.jsx
│  └─ StatusBadge.jsx
├─ db/
│  ├─ schema.ts
│  └─ index.ts
└─ lib/
   └─ auth.ts
```

## Useful commands

```bash
npm run dev
npm run build
npm start
npm run lint
npm run typecheck
```

## Camera permissions

Camera capture uses the browser `getUserMedia` API. It works on `localhost` and on HTTPS deployments, subject to browser permission. Uploading an existing image is available as a fallback.

## Security notes

- Keep `DATABASE_URL` and `AUTH_SECRET` in environment variables.
- Do not commit `.env` or `.env.local`.
- If a database password has ever been committed to Git history, rotate that password before deploying.
- The demo credentials are intentionally part of the demo flow; do not use them for production accounts.

## Production checklist

Before deployment, configure the production `DATABASE_URL` and `AUTH_SECRET`, ensure PostgreSQL is reachable from the server, apply the database schema, and run:

```bash
npm run build
npm start
```

The repository is a Next.js application, so it should be deployed as a Node/Next.js service rather than as a static-only site.

---

Built with care for families searching for hope.
