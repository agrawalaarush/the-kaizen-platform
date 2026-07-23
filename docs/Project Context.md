# Kaizen Platform Project Context

## User
Aarush Agrawal
OSB India Internship

## Tech Stack
Frontend:
- React
- Tailwind CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas
- Mongoose

## Authentication
- JWT
- bcrypt
- @osb.co.uk emails only

## Registration Flow
- User enters email + password
- Name extracted from email
- Role defaults to Employee
- Future enhancement: email verification

## Roles
- Employee
- Reviewer
- Admin

## Idea Workflow
Pending Review
→ Approved
→ In Progress
→ Implemented

or

Pending Review
→ Rejected

## Current Backend Progress

Completed:
- Express Setup
- MongoDB Atlas Connection
- User Model
- Registration API

Next Task:
- POST /api/auth/login