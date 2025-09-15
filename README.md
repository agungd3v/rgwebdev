```
📦 
├─ .gitignore
├─ .sequelizerc
├─ README.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  ├─ login
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ register
│  │  │  │     └─ route.ts
│  │  │  ├─ note
│  │  │  │  ├─ comment
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ detail
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ global
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ route.ts
│  │  │  └─ user
│  │  │     └─ route.ts
│  │  ├─ auth
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ register
│  │  │     └─ page.tsx
│  │  ├─ dashboard
│  │  │  ├─ layout.tsx
│  │  │  ├─ notes
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ notes
│  │  │  ├─ [id]
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ CreateNote.tsx
│  │  ├─ DashboardListNote.tsx
│  │  ├─ DashboardNavbar.tsx
│  │  ├─ ListNote.tsx
│  │  ├─ LogoutButton.tsx
│  │  ├─ NoteDetail.tsx
│  │  ├─ NoutFound.tsx
│  │  ├─ ToastProvider.tsx
│  │  └─ shared
│  │     ├─ Avatar.tsx
│  │     ├─ Modal.tsx
│  │     └─ Select.tsx
│  ├─ config
│  │  └─ database.ts
│  ├─ database
│  │  ├─ config.js
│  │  ├─ migrations
│  │  │  ├─ 20250912-create-user.ts
│  │  │  ├─ 20250913-create-note.ts
│  │  │  ├─ 20250914-create-comment.ts
│  │  │  └─ 20250914-create-note_comment.ts
│  │  └─ sequelize.ts
│  ├─ models
│  │  ├─ associations.ts
│  │  ├─ comment_model.ts
│  │  ├─ index.ts
│  │  ├─ note_comment_model.ts
│  │  ├─ note_model.ts
│  │  └─ user_model.ts
│  ├─ repository
│  │  ├─ auth_repository.ts
│  │  ├─ comment_repository.ts
│  │  └─ note_repository.ts
│  └─ store
│     ├─ auth.ts
│     ├─ navs.ts
│     └─ toggle.ts
├─ tsconfig.json
└─ types.d.ts
```