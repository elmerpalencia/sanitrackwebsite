# SaniTrack

> **Capstone Project — University of Arkansas**  
> Developed in collaboration with the UA Biomedical Engineering Team

SaniTrack is a hand hygiene compliance monitoring platform built for healthcare environments. It pairs a **smartwatch app** with a **web dashboard** to give hospitals real-time, actionable insight into staff handwashing habits, helping protect patients and improve safety outcomes.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Running the App](#running-the-app)
- [User Roles](#user-roles)
- [Project Team](#project-team)

---

## Overview

Handwashing compliance is one of the most critical — and most overlooked — factors in hospital-acquired infection prevention. SaniTrack makes compliance visible, measurable, and easy to act on.

Staff wear a companion smartwatch app that tracks handwashing events. That data flows into the SaniTrack web dashboard, where individuals and administrators can review compliance statistics, spot trends, and take corrective action — all from a clean, easy-to-read interface.

---

## Features

### For Staff
- View personal handwashing compliance stats
- Track performance over time
- Access from any browser — no install required

### For Administrators
- View compliance data for all staff and fellow admins
- Hospital-wide overview dashboard
- Create and manage user accounts
- Identify high-risk compliance gaps at a glance

---

## Tech Stack

- **Frontend:** Web application (browser-based)
- **Backend:** Containerized via Docker
- **Database:** Configured via environment variables
- **Hardware Integration:** Companion smartwatch app (Biomedical Engineering team)

---

## Getting Started

### Prerequisites

Make sure you have the following installed before proceeding:

- [Docker](https://www.docker.com/get-started) (required to run the app)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sanitrack/sanitrack
   ```

2. **Set up your environment file** (see [Environment Setup](#environment-setup) below)

3. **Run the app**
   ```bash
   ./runHotReloadContainer
   ```

That's it! The script handles everything — dependencies, build, and startup.

---

## Environment Setup

SaniTrack requires a `.env` file in the project root to connect to the database.

```
# .env
# Contact the project owner for the required credentials
```

> ⚠️ **Access Required:** The database credentials are not included in this repository. Please contact the project owner to obtain your `.env` file before running the application.

---

## Running the App

The `runHotReloadContainer` script spins up the full application stack in Docker with hot-reloading enabled for development. Any changes you make to the source files will automatically reflect in the running app.

```bash
# From inside the sanitrack/sanitrack directory:
./runHotReloadContainer
```

Once running, open your browser and navigate to the URL shown in the terminal output.

---

## User Roles

| Role | Capabilities |
|---|---|
| **Staff** | View personal compliance stats and history |
| **Admin** | View all staff stats, hospital overview, and manage users |

---

## Project Team

This project is a collaboration between the **University of Arkansas Computer Science** and **Biomedical Engineering** programs as part of the senior capstone curriculum.

For questions, access requests, or contributions, please reach out to the project owner.

---

*Built with care at the University of Arkansas 🐗*
