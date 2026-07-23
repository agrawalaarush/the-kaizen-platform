# Postman Collection Planning

## Collection Name

Kaizen Platform API Collection

---

# Folder Structure

## 1. Authentication

### Requests

- Register User
- Setup Password
- Login
- Get Current User

---

## 2. Ideas

### Requests

- Submit New Idea
- Get All Approved Ideas
- Get My Ideas
- Get Idea Details

---

## 3. Comments

### Requests

- Add Comment
- Get Idea Comments

---

## 4. Volunteers

### Requests

- Volunteer For Idea
- Update Volunteer Progress
- Get My Volunteer Activities

---

## 5. User Management

### Requests

- Get All Users
- Update User Role
- Activate User
- Deactivate User

---

## 6. Idea Review

### Requests

- Get Pending Ideas
- Approve Idea
- Reject Idea

---

## 7. Dashboards

### Requests

- Employee Dashboard
- Admin Dashboard

---

# Environment Variables

## Development Environment

BASE_URL

```text
http://localhost:5000/api
```

JWT_TOKEN

```text
<generated-after-login>
```

USER_ID

```text
dynamic
```

IDEA_ID

```text
dynamic
```

VOLUNTEER_ID

```text
dynamic
```

---

# Testing Flow

## Authentication Flow

Register User
    ↓
Setup Password
    ↓
Login
    ↓
Save JWT Token
    ↓
Use Token For Protected Routes

---

## Employee Flow

Login
    ↓
Submit Idea
    ↓
View My Ideas
    ↓
Comment
    ↓
Volunteer
    ↓
Update Progress

---

## Admin Flow

Login
    ↓
View Pending Ideas
    ↓
Approve / Reject Idea
    ↓
Manage Users
    ↓
Change Roles

---

# Success Criteria

All endpoints should:

- Return proper HTTP status codes
- Return consistent JSON responses
- Validate request data
- Handle errors gracefully
- Require authentication where applicable
- Enforce role-based authorization