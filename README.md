# Task Management Application - Frontend

## About

A web application for managing daily tasks. Users can register, log in, create tasks with due dates and priority levels, track task status, and organize their work. Administrators can view all users and their tasks, and manage user accounts.

The application connects to a REST API backend built with Node.js and Express.

## What It Looks Like

The application has a clean interface with the following screens:

**Authentication pages** - Login and registration forms with validation. Fields highlight errors when input is invalid.

**Dashboard** - The main view after login. Shows a list of tasks with filters for status and priority. Tasks display title, description, due date, priority badge, and current status. Each task has action buttons for editing, changing status, and deleting.

**Task form** - A modal or page with fields for title, description, due date picker, priority dropdown, and file attachment. Form prevents selecting past dates.

**Admin panel** - A separate section with user list, search functionality, and user detail view showing their tasks. Includes delete user option with confirmation dialog.

Navigation switches between user dashboard and admin panel based on role. Loading states appear during API calls.

## How To Use

### Setup

```
npm install
npm run dev
```

The application runs on `http://localhost:5173` by default. Create a `.env` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

### Registration and Login

Create an account with username, email, and password. Password must be at least 8 characters. Email must be valid format. After registration, log in with email and password. The application stores the access token and handles token refresh automatically.

### Managing Tasks

Click "New Task" to create a task. Fill in title and description which are required. Set priority to low, medium, or high. Optionally pick a due date which cannot be in the past. Attach a file if needed.

Tasks appear in the dashboard list. Use filters to show tasks by status or priority. Click a task to view details. Use the edit button to modify task fields. Use the status dropdown to move tasks between todo, in progress, and completed.

### Admin Functions

If your account has admin role, the admin panel becomes available. Search users by username or email. Click a user to see their profile and all their tasks with statistics. Delete a user account if needed. The dashboard shows overall statistics including total users, total tasks, and tasks grouped by status.

## Future Improvements

**Task collaboration** - Allow users to share tasks with other users and assign tasks to team members.

**Real-time updates** - Implement WebSocket connections so task changes appear immediately without page refresh.

**Task categories and tags** - Add custom categories and tags for better task organization beyond just priority levels.

**Email notifications** - Send email reminders for approaching due dates and task assignments.

**Task comments** - Allow users to add comments on tasks for better communication.

**File storage integration** - Connect to cloud storage services for better attachment handling.

**Dashboard analytics** - Add charts and graphs showing task completion trends over time.

**Mobile responsive design** - Improve layouts for phone and tablet screens.

**Dark mode** - Add theme switching option.

**Keyboard shortcuts** - Add keyboard navigation for faster task management.

**Bulk operations** - Allow selecting multiple tasks for status changes or deletion.

**Export functionality** - Export tasks to CSV or PDF format for reporting.

**OAuth integration** - Add social login options like Google and GitHub.