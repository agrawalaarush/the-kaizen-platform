                    User
    ---------------------------------
    _id
    employeeId
    name
    email
    passwordHash
    department
    role
    isActive
           | 1
           |
           | ∞
           |
          Idea
    ---------------------------------
    _id
    ideaId
    title
    description
    submittedBy
    department
    category
    status
    submittedAt
           |
           | 1
      ----------------
      |              |
      |∞            |∞
      |              |
   Comment      Volunteer
----------------  ----------------
_id               _id
commentId         volunteerId
ideaId            ideaId
commentedBy       userId
commentText       volunteeredAt
commentedAt       progress
                  status