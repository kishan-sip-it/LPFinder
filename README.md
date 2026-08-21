# LFPFinder / ReuniteFind

A full-stack missing-person reporting and finding platform built with Next.js, React, TypeScript/JSX, PostgreSQL, Drizzle ORM, and cookie-based JWT authentication.

The application is centered around two primary actions:

- **Report someone** — submit and manage a missing-person report.
- **Looking for someone** — browse public reports and search for a person.

## Tech Stack

- **Next.js 16.2.6** — App Router
- **React 19.2.6**
- **TypeScript 5.9.3**
- **PostgreSQL**
- **Drizzle ORM 0.45.2**
- **pg** — PostgreSQL driver
- **jose** — JWT signing and verification
- **bcryptjs** — password hashing
- **Tailwind CSS 4**
- **ESLint 9**

The versions and available npm scripts are defined in `package.json`. fileciteturn53file0

## Features

### Public experience

- Custom landing page at `/`
- Public report browsing at `/browse`
- Public report details at `/browse/[id]`
- Public users can browse reports without accessing private management APIs

### Authentication

- Email/password registration and login
- Password hashing with bcrypt
- HTTP-only JWT session cookie
- Current-user endpoint
- Logout support
- Seven-day session lifetime

Sessions use the `flp_session` cookie and are implemented in `src/lib/auth.ts`. fileciteturn58file0

### Role-based access control

The application has three roles:

| Role | Permissions |
| --- | --- |
| `finder` | Browse/read reports only |
| `reporter` | Create reports and edit/delete only their own reports |
| `admin` | Full report management and official status changes |

Public registration always creates a `reporter`; users cannot self-select `admin`. fileciteturn55file0

### Report management

Authenticated report APIs are:

- `GET /api/persons`
- `POST /api/persons`
- `GET /api/persons/[id]`
- `PATCH /api/persons/[id]`
- `DELETE /api/persons/[id]`

Ownership is stored in `lostPersons.userId`, which references `users.id`. fileciteturn54file0

### Ownership security

Authorization is enforced on the server, not only by hiding frontend buttons.

- Reporters can edit/delete only reports they own.
- Admins can edit/delete any report.
- Finders cannot create, edit, or delete reports.
- The API checks the authenticated user's real database ID against the report's `userId`.

### Case status permissions

Official statuses are:

- `missing`
- `investigating`
- `found`

Only admins can directly change the official status. Non-admin users cannot bypass this restriction by manually calling the API.

### My Reports

`/my-reports` shows reports associated with the authenticated user's account.

### Report information

Reports can contain:

- Full name
- Age
- Gender
- Height
- Complexion
- Identifying marks
- Photo
- Last seen location
- Last seen date
- Clothing description
- Case status
- Description
- Reporter name
- Reporter relationship
- Contact phone
- Contact email
- Created/updated timestamps

The database model is defined in `src/db/schema.ts`. fileciteturn54file0

## Routes

### Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/browse` | Public report browsing |
| `/browse/[id]` | Public report detail |
| `/login` | Login |
| `/my-reports` | Current user's reports |
| `/dashboard` | Dashboard |
| `/dashboard/persons/new` | Create a report |
| `/dashboard/persons/[id]` | Private report detail/management |
| `/dashboard/persons/[id]/edit` | Edit an authorized report |

The old redundant `/dashboard/persons` listing route has been removed. The child routes above remain because they are still used for report creation and management.

### API

| Endpoint | Purpose |
| --- | --- |
| `POST /api/auth/login` | Authenticate a user |
| `POST /api/auth/register` | Register a reporter account |
| `GET /api/auth/me` | Get the current authenticated user |
| `POST /api/auth/logout` | End the current session |
| `GET /api/persons` | List private reports according to role/ownership |
| `POST /api/persons` | Create a report |
| `GET /api/persons/[id]` | Get an authorized private report |
| `PATCH /api/persons/[id]` | Update an authorized report |
| `DELETE /api/persons/[id]` | Delete an authorized report |
| `GET /api/public/persons` | Public report listing |
| `GET /api/public/persons/[id]` | Public report detail |
| `GET /api/health` | Health check |
| `/api/stats` | Dashboard statistics |
| `/api/seed` | Development/demo seed endpoint |

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── persons/
│   │   ├── public/
│   │   ├── health/
│   │   ├── seed/
│   │   └── stats/
│   ├── browse/
│   ├── dashboard/
│   ├── login/
│   └── my-reports/
├── components/
├── db/
│   ├── index.ts
│   └── schema.ts
└── lib/
    └── auth.ts
```

## Database

The application uses PostgreSQL through Drizzle ORM and the `pg` driver.

The database connection reads `DATABASE_URL` from the environment and requires it to be present. fileciteturn57file0

### `users`

Stores:

- `id`
- `name`
- `email`
- `passwordHash`
- `role`
- `createdAt`

### `lost_persons`

Stores report information and the owning `user_id`.

The ownership field references `users.id` with cascade deletion. Indexes exist for report ownership and status. fileciteturn54file0

## Getting Started

### Requirements

- Node.js 20+
- npm
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/kishan-sip-it/LPFinder.git
cd LPFinder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create PostgreSQL database

For the current local development setup, the database is named `find_db`.

Example:

```sql
CREATE DATABASE find_db;
```

### 4. Configure environment variables

Create `.env.local` in the project root:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/find_db
AUTH_SECRET=replace-with-a-long-random-secret
```

`DATABASE_URL` is required by the database layer. `AUTH_SECRET` is used to sign and verify JWT sessions. fileciteturn57file0turn58file0

Never commit `.env.local`, database passwords, or production secrets.

### 5. Prepare the database schema

The project uses Drizzle ORM. Use the project's Drizzle configuration and schema to create/update the database schema.

The main application tables are `users` and `lost_persons`. fileciteturn54file0

### 6. Start development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 7. Production build

```bash
npm run build
npm run start
```

## npm Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

These scripts are defined in `package.json`. fileciteturn53file0

## Authorization Model

```text
                         ADMIN
                           │
               Full report management
                 + status management
                           │
             ┌─────────────┴─────────────┐
             │                           │
          REPORTER                    FINDER
             │                           │
      Create reports              Browse/read only
      Manage own reports
      No status changes
```

### Important security rule

Frontend UI restrictions are not treated as security boundaries.

Every private report operation checks authentication and authorization on the server. Ownership is determined from the database's `lost_persons.user_id` value rather than trusting a client-provided ownership value.

## Development Status

The current project milestone includes:

- Public report browsing
- Public report details
- My Reports
- Authentication and RBAC
- Finder/reporter/admin roles
- Ownership-based report management
- Server-side authorization
- Admin-only official case-status changes
- Redundant dashboard listing cleanup
- Passing production build

## Repository

GitHub: https://github.com/kishan-sip-it/LPFinder

## License

No project license is currently documented in the repository. Add a `LICENSE` file and update this section when a license is selected.

---

Built for the goal of helping people find missing loved ones and reunite families.
