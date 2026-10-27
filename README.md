# Swedish Learning Hub

A full-stack community platform where learners can share Swedish language tips, vocabulary, grammar discussions, and cultural insights.

---

## Features

- **Authentication:** Sign up and log in via Supabase Auth.
- **Posts (CRUD):** 
  - Browse and read public posts.
  - Create new posts with optional image uploads.
  - Edit your own post content and replace images.
  - Delete your own posts.
  - Protected author-only edit routes.
- **Comments:** 
  - Read public discussions.
  - Post comments when authenticated.
  - Delete your own comments.
  - Post authors can moderate/delete any comment on their posts.
- **Search:** Search posts by title.
- **Responsive UI:** Fully responsive design built with Tailwind CSS.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS
- **State Management & Data Fetching:** React Query (`@tanstack/react-query`)
- **Validation:** Zod & React Hook Form
- **Deployment:** Vercel

---

## Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/Chaitali786/Robbit-.git](https://github.com/Chaitali786/Robbit-.git)
cd Robbit-
