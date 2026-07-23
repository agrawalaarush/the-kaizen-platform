# Kaizen Platform Architecture Diagram

```plaintext
Employee / Reviewer / Admin
            │
            ▼
┌────────────────────────────┐
│ React Frontend             │
│ Tailwind CSS               │
└─────────────┬──────────────┘
              │
           Axios
              │
              ▼
┌────────────────────────────┐
│ Node.js + Express Backend  │
│ Authentication             │
│ Authorization              │
│ Business Logic             │
│ Validation                 │
└─────────────┬──────────────┘
              │
          Mongoose
              │
              ▼
┌────────────────────────────┐
│ MongoDB Atlas              │
│ Users                      │
│ Ideas                      │
│ Comments                   │
│ Volunteers                 │
│ Categories                 │
│ Status History             │
└────────────────────────────┘
```