# Kaizen Platform Architecture

## Overview

The Kaizen Platform follows a three-tier architecture consisting of:

1. Frontend Layer
2. Backend Layer
3. Database Layer

---

## Architecture Flow

User
↓
React Frontend
↓
Axios HTTP Requests
↓
Node.js + Express Backend
↓
MongoDB Atlas Database

---

## Frontend Layer

Technology:
- React.js
- Tailwind CSS

Responsibilities:
- Display user interface
- Collect user input
- Send API requests
- Display responses

---

## Backend Layer

Technology:
- Node.js
- Express.js

Responsibilities:
- Authentication
- Authorization
- Business Logic
- Validation
- API Endpoints
- Database Communication

---

## Database Layer

Technology:
- MongoDB Atlas

Responsibilities:
- Store Users
- Store Ideas
- Store Comments
- Store Volunteers
- Store Categories
- Store Status History

---

## Authentication

JWT (JSON Web Tokens)

Flow:

User Login
↓
Backend Validates Credentials
↓
JWT Generated
↓
Token Sent To Frontend
↓
Frontend Includes Token In Future Requests

---

## User Roles

Employee
Reviewer
Admin