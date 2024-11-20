# Project Name

## Description
This project provides a platform where users can view assignments posted by admins, submit assignments, and manage submissions. Admins can create assignments, view submissions, and accept or reject them.

---

## Steps to Set Up the Project

### 1. **Setting up the Backend**

- **Clone the repository** and navigate to the `Backend` folder:

```bash
git clone <repository-url>
cd Backend
npm install
```
**Set up Environment Variables:**

- You need to provide the following environment variables:
**DATABASE_URL: The URL of your database.**
**ADMIN_SECRET: A secret key that each admin will need to enter during the signup process.**

Run the Backend:

```bash
npm run dev
```
This will start the backend server, typically running on port 5000.

### **2. Setting up the Frontend**
**Navigate to the Frontend folder:**
```bash
cd ../Frontend
```
**Install dependencies:**
```bash
npm install
```
**Configure the Backend URL:**
- In the frontend code, update the backend URL to the correct address of your backend server to establish the connection.
Run the Frontend:

```bash
npm run dev
```
This will start the frontend server, typically running on port 3000.

## User and Admin Features
### User Features:
**Signup & Login: Users can sign up and log in to the system.**
**View Assignments: Users can view assignments posted by all admins.**
**Submit Assignments: Users can view the details of an assignment and submit their responses.**

### Admin Features:
**Signup & Login: Admins can sign up, but they need to provide the ADMIN_SECRET key during signup to complete the process.**
**Admin Dashboard:**
**Create new assignments.**
**View all assignments posted by the admin and the submissions from different users.**
**Accept or reject user submissions.**

## Routes
### User Routes:
**Login:**
POST /login: Log in a user.
**Signup:**
POST /signup: Register a new user.
**User Routes:**
GET /user: Fetch user details.
GET /:id: Get details of a specific assignment.
POST /:id/submit: Submit an assignment.
### Admin Routes:
**Create Assignment:**
POST /create: Admin can create a new assignment.
**Admin Dashboard:**
GET /admin: View all assignments created by the admin and user submissions.
PUT /:id: Update user submissions (Accept or Reject).
## Summary
This project allows users to interact with assignments, while admins manage assignment creation and submissions. Users can sign up, log in, and submit assignments, while admins can create assignments, review submissions, and approve or reject them.
