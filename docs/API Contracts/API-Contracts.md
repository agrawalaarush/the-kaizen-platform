# Kaizen Platform API Contracts

## Version
v1.0

## Base URL

```
/api
```

## Authentication

Authentication will use JWT tokens.

Protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 1. Authentication APIs

## 1.1 Register User

### Endpoint

```http
POST /api/auth/register
```

### Description

Registers a new user using a valid OSB email address and sends a password setup email.

### Request Body

```json
{
  "email": "employee@osb.co.uk"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Password setup email sent successfully."
}
```

### Error Response

```json
{
  "success": false,
  "message": "Only OSB email addresses are allowed."
}
```

---

## 1.2 Setup Password

### Endpoint

```http
POST /api/auth/setup-password
```

### Description

Sets password for first-time users.

### Request Body

```json
{
  "token": "setup-token",
  "password": "Password@123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Password created successfully."
}
```

---

## 1.3 Login

### Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "employee@osb.co.uk",
  "password": "Password@123"
}
```

### Success Response

```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "USER001",
    "name": "Aarush Agrawal",
    "email": "employee@osb.co.uk",
    "role": "Employee"
  }
}
```

---

## 1.4 Get Current User

### Endpoint

```http
GET /api/auth/me
```

### Success Response

```json
{
  "id": "USER001",
  "name": "Aarush Agrawal",
  "email": "employee@osb.co.uk",
  "role": "Employee"
}
```

---

# 2. Idea APIs

## 2.1 Submit New Idea

### Endpoint

```http
POST /api/ideas
```

### Description

Creates a new idea and sets status to Pending Review.

### Request Body

```json
{
  "title": "Meeting Room Booking Portal",
  "description": "Employees can reserve meeting rooms online.",
  "category": "Operations"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Idea submitted successfully.",
  "status": "Pending Review"
}
```

---

## 2.2 Get All Approved Ideas

### Endpoint

```http
GET /api/ideas
```

### Description

Returns all approved ideas visible to employees.

### Success Response

```json
[
  {
    "ideaId": "IDEA001",
    "title": "Meeting Room Booking Portal",
    "category": "Operations",
    "status": "Approved"
  }
]
```

---

## 2.3 Get My Ideas

### Endpoint

```http
GET /api/ideas/my
```

### Description

Returns all ideas submitted by the logged-in user.

### Success Response

```json
[
  {
    "ideaId": "IDEA001",
    "title": "Meeting Room Booking Portal",
    "status": "Pending Review"
  }
]
```

---

## 2.4 Get Idea Details

### Endpoint

```http
GET /api/ideas/:id
```

### Description

Returns complete details of a specific idea.

### Success Response

```json
{
  "ideaId": "IDEA001",
  "title": "Meeting Room Booking Portal",
  "description": "Employees can reserve meeting rooms online.",
  "category": "Operations",
  "status": "Approved",
  "submittedBy": "Aarush Agrawal",
  "comments": [],
  "volunteers": []
}
```

---

# 3. Comment APIs

## 3.1 Add Comment

### Endpoint

```http
POST /api/comments
```

### Request Body

```json
{
  "ideaId": "IDEA001",
  "commentText": "This could improve room utilization."
}
```

### Success Response

```json
{
  "success": true,
  "message": "Comment added successfully."
}
```

---

## 3.2 Get Idea Comments

### Endpoint

```http
GET /api/comments/:ideaId
```

### Success Response

```json
[
  {
    "commentId": "COMMENT001",
    "commentedBy": "Aarush Agrawal",
    "commentText": "This could improve room utilization."
  }
]
```

---

# 4. Volunteer APIs

## 4.1 Volunteer for Idea

### Endpoint

```http
POST /api/volunteers
```

### Request Body

```json
{
  "ideaId": "IDEA001"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Successfully volunteered for idea."
}
```

---

## 4.2 Update Volunteer Progress

### Endpoint

```http
PATCH /api/volunteers/:id
```

### Request Body

```json
{
  "progress": 75,
  "status": "Active"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Progress updated successfully."
}
```

---

## 4.3 Get My Volunteer Activities

### Endpoint

```http
GET /api/volunteers/my
```

### Success Response

```json
[
  {
    "ideaId": "IDEA001",
    "title": "Meeting Room Booking Portal",
    "progress": 75,
    "status": "Active"
  }
]
```

---

# 5. Admin User Management APIs

## 5.1 Get All Users

### Endpoint

```http
GET /api/admin/users
```

### Description

Returns all registered users.

### Success Response

```json
[
  {
    "userId": "USER001",
    "name": "Aarush Agrawal",
    "email": "employee@osb.co.uk",
    "role": "Employee",
    "isActive": true
  }
]
```

---

## 5.2 Update User Role

### Endpoint

```http
PATCH /api/admin/users/:id/role
```

### Request Body

```json
{
  "role": "Reviewer"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Role updated successfully."
}
```

---

## 5.3 Activate / Deactivate User

### Endpoint

```http
PATCH /api/admin/users/:id/status
```

### Request Body

```json
{
  "isActive": false
}
```

### Success Response

```json
{
  "success": true,
  "message": "User status updated successfully."
}
```

---

# 6. Admin Idea Review APIs

## 6.1 Get Pending Ideas

### Endpoint

```http
GET /api/admin/ideas/pending
```

### Description

Returns all ideas awaiting review.

### Success Response

```json
[
  {
    "ideaId": "IDEA001",
    "title": "Meeting Room Booking Portal",
    "submittedBy": "Aarush Agrawal",
    "status": "Pending Review"
  }
]
```

---

## 6.2 Approve Idea

### Endpoint

```http
PATCH /api/admin/ideas/:id/approve
```

### Success Response

```json
{
  "success": true,
  "message": "Idea approved successfully.",
  "status": "Approved"
}
```

---

## 6.3 Reject Idea

### Endpoint

```http
PATCH /api/admin/ideas/:id/reject
```

### Request Body

```json
{
  "reason": "Duplicate idea already exists."
}
```

### Success Response

```json
{
  "success": true,
  "message": "Idea rejected successfully.",
  "status": "Rejected"
}
```

---

# 7. Dashboard APIs

## 7.1 Employee Dashboard

### Endpoint

```http
GET /api/dashboard/employee
```

### Returns

- Total Ideas Submitted
- Total Approved Ideas
- Total Volunteer Activities
- Recent Activity

---

## 7.2 Admin Dashboard

### Endpoint

```http
GET /api/dashboard/admin
```

### Returns

- Total Users
- Total Ideas
- Pending Reviews
- Approved Ideas
- Rejected Ideas

---

# User Roles

## Employee

Permissions:

- Submit Ideas
- View Approved Ideas
- View Own Ideas
- Comment
- Volunteer
- Update Own Volunteer Progress

---

## Reviewer

Permissions:

- All Employee Permissions
- Review Assigned Ideas
- Approve Ideas
- Reject Ideas

---

## Admin

Permissions:

- Full System Access
- User Management
- Role Management
- Idea Approval/Rejection
- Dashboard Analytics

---

# Idea Status Flow

```text
Pending Review
       ↓
    Approved
       ↓
   In Progress
       ↓
  Implemented
```

OR

```text
Pending Review
       ↓
    Rejected
```

---

# Authentication & Security

- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Role-Based Access Control (RBAC)
- OSB Email Restriction (`@osb.co.uk`)