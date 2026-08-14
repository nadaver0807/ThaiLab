<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Persistent memory for AI agents working on this project.
**Source of truth: the "סטנדרטים לפיתוח" document. These rules are mandatory, not suggestions.**

---

## Project Identity

- **Name**: ThaiLab
- **Purpose**: Marketing + ordering website for an authentic Thai food business
- **Architecture**: npm-workspaces monorepo — `client`, `server` and `shared` are three
  independent packages. `client` and `server` run as **separate services**.
- **Client**: Next.js 16 (App Router), React 19, TypeScript, MUI v7, Emotion (RTL cache),
  TanStack Query, react-hook-form — port **3000**
- **Server**: Express 5, TypeScript, Zod, http-status-codes — port **4000**
- **Shared**: Zod schemas, types, enums, consts — built with `tsc`, consumed as `@thailab/shared`
- **Language**: Hebrew-first, RTL (`lang="he" dir="rtl"`)

---

## Session Startup

- Read this file and `.claude/agents/client.md` before making any code change.
- Read the relevant guide in `node_modules/next/dist/docs/` before using an unfamiliar Next.js API.

---

## Monorepo Layout

Three packages, three isolated layers. `client` and `server` are **separate running services**.

```
ThaiLab/
├─ package.json                     # npm workspaces + orchestration scripts
├─ tsconfig.base.json
│
├─ shared/                          # @thailab/shared — built to dist/, imported by both
│  ├─ src/
│  │  ├─ consts/*.const.ts
│  │  ├─ enums/*.enum.ts
│  │  ├─ types/*.type.ts
│  │  ├─ validations/*.validation.ts
│  │  └─ index.ts                   # barrel — the package's public API
│  ├─ eslint.config.mjs
│  ├─ tsconfig.json
│  └─ package.json
│
├─ server/                          # @thailab/server — Express, port 4000
│  ├─ src/
│  │  ├─ <entity>/                  # one folder per standalone entity
│  │  │  ├─ Entity.entity.ts        # the entity model
│  │  │  ├─ entity.service.ts       # business logic + data access
│  │  │  └─ entity.route.ts         # Router() with typed request/response
│  │  ├─ middlewares/*.middleware.ts
│  │  ├─ app.ts                     # express app + router mounting
│  │  ├─ server.const.ts
│  │  └─ index.ts                   # listen()
│  ├─ eslint.config.mjs
│  ├─ tsconfig.json
│  └─ package.json
│
└─ client/                          # @thailab/client — Next.js, port 3000
   ├─ src/
   │  ├─ app/                       # routing layer only — no logic, no API routes
   │  ├─ components/
   │  │  ├─ shared/<kebab-case>/
   │  │  ├─ layout/<kebab-case>/
   │  │  └─ <feature>/<kebab-case>/
   │  ├─ hooks/api/                 # one hook per server request
   │  └─ theme/                     # MUI theme + providers
   ├─ eslint.config.mjs
   ├─ tsconfig.json
   └─ package.json
```

### Layer rules (enforced by ESLint)

- `shared` → imported by both; imports from **neither** `@thailab/client` nor `@thailab/server`.
- `server` → may import `@thailab/shared`, **never** client code.
- `client` → may import `@thailab/shared`, **never** server code.
- The client talks to the server **only over HTTP** through `src/hooks/api/`.
  There are no Next.js API routes — all endpoints live in the Express server.
- `client/src/app/` is routing only: a `page.tsx` renders a component from `@components`.

### Scripts

| Command | Effect |
|---|---|
| `npm run dev` | builds `shared`, then runs server (4000) + client (3000) in parallel |
| `npm run dev:server` / `npm run dev:client` | a single service |
| `npm run build` | shared → server → client |
| `npm run lint` | lints all three packages |

### Server layer

- One folder per standalone entity, with sub-folders for the smaller entities composing it.
- The **service** holds all logic and data access. The **route** creates a
  `const entityRouter = Router()` and declares explicit request/response types per endpoint,
  staying thin — validation via middleware, logic pushed into the service.
- Status codes come from `StatusCodes` (`http-status-codes`) — never hardcoded numbers.
- Bodies are validated with `validateZodSchema(schema)` using a schema from `@thailab/shared`.

### Naming

- **One folder per component**, folder name in `kebab-case`, holding every file that belongs to it:
  `ComponentName.tsx`, `ComponentName.style.ts`, `ComponentName.util.ts`, `ComponentName.const.ts`,
  `ComponentName.type.ts`, `useComponentName.ts`.
- Component files: `PascalCase.tsx`. Non-component files: `camelCase.fileType.ts`
  (e.g. `menuDetails.util.ts`, `Dish.entity.ts`).

### Import aliases

- Client: `@/*`, `@components/*`, `@hooks/*`, `@theme/*`
- Server: `@server/*` (relative imports within an entity folder are fine)
- Cross-package: always `@thailab/shared`
- Relative traversal (`../`) across folders is forbidden in the client.

---

## Components

- Name in `PascalCase`, extension `.tsx`.
- Props type declared **above** the component signature, named `ComponentNameProps`.
- Signature: `const ComponentName: FC<ComponentNameProps> = ({ ...props }) => ...` — `FC` is mandatory.
- Export with `export default ComponentName`.
- **Max 150 lines per component** (enforced by ESLint).
- Prefer existing hooks (`useParams`, `useRouter`, `useSearchParams`).
- Extract hook-based logic into a dedicated `useComponentName.ts` in the component folder — use judgement, don't over-engineer.
- Prefer `useMemo`/`useCallback`; minimize `useState`/`useEffect` (see "You Might Not Need an Effect").
- Prefer existing generic components before writing new ones.
- MUI unless there's a real blocker.

---

## Styling

- **MUI**, always, unless blocked.
- MUI components get `sx`; plain HTML tags get `style`.
- **Every component has a matching `ComponentName.style.ts` in its folder.** No styling written on the tag itself — ever.
- One object per tag (or per group of identically-styled tags), named after the tag/group.
- Type every object: `SxProps<Theme>` for `sx`, `CSSProperties` for `style`.
- Colors come from the theme only.
- Fonts and weights come from theme `variant`s, not ad-hoc values.
- Export as one object: `const Styles = { a, b }; export default Styles;` — imported as `import Styles from '...'` and used as `sx={Styles.a}`.

---

## Validation

- Zod schemas (and their inferred types) live in `src/shared/validations/` and are used by **both** `zodResolver` in `useForm` and any server-side validation.
- Shared field patterns (limited string, phone, email, enum value...) come from `common.validation.ts` — never re-declare them per form.

---

## Forms

- `react-hook-form` + `zodResolver` + `defaultValues`; wrap generic fields in `Controller`.
- **Never `watch` from `useForm`** — use `useWatch` from `react-hook-form` (enforced by ESLint).
- Map/normalize form values **server-side only**, never before sending.
- **Never pass `useForm` methods as props** — use `useFormContext`.
- Build forms only from the generic field components (`ControlledTextField`, selectors, date fields...).

---

## API

- Every client→server request lives in a dedicated hook in `client/src/hooks/api/` using TanStack Query.
- All requests go through the `request()` helper in `api.util.ts`, which prefixes `API_BASE_URL`
  (`NEXT_PUBLIC_API_BASE_URL`, default `http://localhost:4000/api`).
- **Read** — file `useGetEntityBySomething.ts`:
  - `export const USE_GET_ENTITY_BY_SOMETHING_KEY = 'useGetEntityBySomething';`
  - a `getEntityBySomething` function performing the request
  - `useGetEntityBySomething` built on `useQuery` (or `useInfiniteQuery` for pagination)
- **Write** — file `useSaveEntity.ts`:
  - a `saveEntity` function performing the request
  - `useSaveEntity` built on `useMutation`
  - on success, `queryClient.invalidateQueries` for the entity's read key **and every key the write may affect**

---

## Code Style (enforced by ESLint + Prettier)

- Blank line before and after every block (type, component, condition...) and before every `return`. Never two consecutive blank lines.
- Max line length: **100 characters**.
- No unused files and no exports without an import elsewhere.
- Single quotes, semicolons, trailing commas.

---

## Git Workflow

- Branch name: `snake_case` including the task number — `14003_accompanying_roles`.
- PR title: `Fixed AB#<task> <short description>` — `Fixed AB#15070 add users table`.
- Every PR includes a short description of the task and the code changes. Client-side changes require before/after screenshots or a video.
- Keep PRs small — around **15 files**; split when possible.
- Merge to `dev`: **squash and merge**. Merge to any other branch (test, preprod, main): **create a merge commit**.

---

## Common Mistakes to Avoid

- Styling on the tag instead of in `ComponentName.style.ts`
- A component without its own folder, or a folder not in `kebab-case`
- `function` declarations instead of arrow functions; missing `FC` typing; named export instead of `export default`
- `watch` instead of `useWatch`; passing form methods as props
- Duplicating a validation instead of reusing `common.validation.ts`
- `shared/` importing client code
- Hardcoded colors/fonts instead of theme tokens
- Mirroring server data into `useState`; skipping `invalidateQueries`
- Adding `'use client'` to a page just to make a child interactive — wrap the child instead
- Forgetting RTL — this is a Hebrew-primary application
