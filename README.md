<p align="center">
  <img src="https://img.shields.io/badge/Angular-19.2-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/NgRx-Store-999999?style=for-the-badge&logo=redux&logoColor=white" alt="NgRx" />
  <img src="https://img.shields.io/badge/Stripe-Payments-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
</p>

<h1 align="center">Angular E‑commerce</h1>

<p align="center">
  <strong>Modern, responsive e‑commerce front-end</strong> — Angular 19, NgRx, Sass & Node.js with Stripe integration.
</p>
---

## Table of contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech stack](#-tech-stack)
- [Quick start](#-quick-start)
- [Deploy to Vercel](#-deploy-to-vercel)
- [Project structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## Overview

A production-oriented e‑commerce front-end built with **Angular 19.2**, **NgRx**, **Sass**, and **Node.js** for Stripe payments. The project follows clean architecture, strong state management, and responsive design.

---

## Features

| Area         | Description                                        |
| ------------ | -------------------------------------------------- |
| **Cart**     | Persistent cart state with NgRx                    |
| **Payments** | Stripe Checkout integration via Express backend    |
| **UI/UX**    | Responsive layout, SCSS animations, modern styling |
| **State**    | NgRx Store for predictable state management        |
| **Code**     | Modular structure and consistent patterns          |

---

## Tech stack

| Layer        | Technologies                                                |
| ------------ | ----------------------------------------------------------- |
| **Frontend** | Angular 19.2, NgRx, RxJS, TypeScript, Sass, Stripe (client) |
| **Backend**  | Node.js, Express (Stripe webhooks & checkout)               |
| **Styling**  | SCSS, CSS animations, responsive breakpoints                |
| **Deploy**   | Vercel (frontend + backend as separate projects)            |

---

## Quick start

**1. Clone and enter the repo**

```bash
git clone https://github.com/ali-0407/angular-ecommerce.git
cd angular-ecommerce
```

**2. Install and run the Angular app**

```bash
cd angular-ecommerce-app
npm install
npm start
```

**3. In another terminal — install and run the Stripe server**

```bash
cd my-app-server
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). Ensure the backend is running for checkout.

---

## Deploy to Vercel

Deploy **frontend** and **backend** as **two separate Vercel projects**.

| Project  | Root Directory          | Build Command   | Output Directory                          |
| -------- | ----------------------- | --------------- | ----------------------------------------- |
| Frontend | `angular-ecommerce-app` | `npm run build` | **`dist/angular-ecommerce-app/browser`**   |
| Backend  | `my-app-server`         | _(none)_        | — (Vercel runs `server.js`)               |

**Important (Angular 19):** The frontend build puts files in a `browser` subfolder. You **must** set the frontend project’s **Output Directory** to `dist/angular-ecommerce-app/browser` in Vercel (Project → Settings → General). If you use `dist/angular-ecommerce-app` you will get 404s. The repo’s `angular-ecommerce-app/vercel.json` already sets this.

**After deploying the backend:** copy its URL (e.g. `https://my-app-server-xxx.vercel.app`). In the **frontend** Vercel project, add an environment variable (e.g. `serverUrl` or the name your Angular app uses) and set it to that backend URL so the app can call the API. Redeploy the frontend after setting the variable.

---

## Project structure

```
angular-ecommerce/
├── angular-ecommerce-app/   # Angular frontend (UI, NgRx, Stripe client)
└── my-app-server/           # Node.js + Express (Stripe checkout & webhooks)
```

---

## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature-name`.
3. Commit changes: `git commit -m 'Add some feature'`.
4. Push: `git push origin feature/your-feature-name`.
5. Open a Pull Request.

For bugs or questions, open an [issue](https://github.com/ali-0407/angular-ecommerce/issues).

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

---
