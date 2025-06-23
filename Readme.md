# 💻 Banking System UI – Microservices Architecture

This repository contains the front-end modules for a web-based **Banking System** developed using **ReactJS + Bootstrap**, following a **modular microservices-based backend** using **Spring Boot + MongoDB**.

- **Each team works inside `src/modules/{module-name}` independently.**
---

## 📁 Module Structure

Each team maintains their module UI in a separate folder:

team1-customer-onboarding/
team2-account-management/
team3-transaction/
team4-loan-management/
team5-complaint/
team6-user-access/


---

## 👥 Team Roles & Modules

| Team | Module | UI Developer |
|------|--------|--------------|
| 1 | Customer Onboarding | `Jobin` |
| 2 | Account Management | `Sri Hari` |
| 3 | Transaction | `Shibin` |
| 4 | Loan Management | `Roshan` |
| 5 | Complaint System | `Ajay` |
| 6 | User Access Management | `Akshaya` |

---

## 👩‍💻 How Each Team Works

### ✅ Setup:
```bash
git clone https://github.com/your-org/banking-system-ui.git
cd banking-system-ui
npm install
npm run dev
```

## 🚀 Tech Stack

- **Frontend**: ReactJS, Bootstrap, Axios, React Router DOM
- **Backend**: Java Spring Boot (separate repos)
- **Database**: MongoDB
- **Version Control**: Git & GitHub

---

## 🛠️ How to Run a Module Locally

```bash
cd team4-loan-management/react-bootstrap-app
npm install
npm start

## 🌐 Common Guidelines

Use Bootstrap for UI consistency across modules

Keep code modular, reusable, and minimal

Commit meaningful messages: feat:, fix:, refactor:

One PR per feature or bugfix

Avoid direct commits to main

Use .env for all API configs

Do not commit node_modules or .env