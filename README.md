# 🗳️ Polling System

> A simple public & private polling system built with **NestJS (backend)** and **ReactJS (frontend)**, with role-based authentication and real-time vote results.  
> I didn't know NestJS before — so I used **AI** to guide me and apply my Express knowledge, and finally made it work!

 AI helped me apply my basic language knowledge to build something unpredictable.
Before AI, we had no option but to fully understand every framework or library before trying to build something. But here, I could transfer my Express knowledge to NestJS with AI’s help.

🗳️ Users can vote in created polls and instantly see how many votes each option received on the right side.

🕒 Expiry time works based on the time set by the admin, who decides how long the poll stays active.
The admin can also create, update, and delete polls.

Note: Only the title and options can be updated — the expiry time cannot be changed once set. So think carefully before clicking Create!

⚙️ API first: Before building the frontend, I tested and verified all backend APIs using Postman.

🧩 The admin and user polling pages are actually the same — but we check the user’s role and show the right options based on whether the user is an admin or a normal user.

🎨 The design is kept simple and clean. The backend uses NestJS, with JWT-based authentication and protected routes for admin features.

---

## ✨ Features

✅ Create **Public** polls or **Private** polls (visible only to selected users)  
✅ Role-based Authentication (**Admin / User**)  
✅ Vote and see **live results**  
✅ Expiry time for polls (set by admin)  
✅ Admin can **create / update / delete** polls  
✅ Toast notifications for success & error:

- login, signup, create poll, update, delete, etc.

---

## 🛠 Tech Stack

| Layer    | Tech                                     |
| -------- | ---------------------------------------- |
| Backend  | NestJS, Mongoose, MongoDB                |
| Frontend | React, Axios, React Router, Tailwind CSS |
| Auth     | JWT                                      |
| Theme    | 🖤 Black & White minimalist style        |

---

## 📦 Installation & Running

```bash
# Clone repository
git clone https://github.com/yourusername/polling-system.git
cd polling-system

▶ Backend
cd Backend
npm install
npm run start:dev

🌐 Frontend
cd Frontend
npm install
npm run dev


Default
Backend: http://localhost:3000
Frontend: http://localhost:5173



📍 Backend API Overview

| Method | Route                    | Description                       |
| ------ | ------------------------ | --------------------------------- |
| POST   | /auth/register           | Register new user                 |
| POST   | /auth/login              | Login user                        |
| POST   | /polls/create            | Create new poll (admin only)      |
| PATCH  | /polls/update/\:pollId   | Update poll title/options (admin) |
| DELETE | /polls/delete/\:pollId   | Delete poll (admin)               |
| GET    | /polls/public            | List public polls                 |
| GET    | /polls/private           | List private polls for user/admin |
| POST   | /vote                    | Submit vote                       |
| GET    | /vote/has-voted/\:pollId | Check if user already voted       |
| GET    | /vote/result/\:pollId    | Get poll results                  |



I already mentioned that I hadn’t learned NestJS before this project — I only knew the basics of NodeJS + ExpressJS.
But this time, the stack was NodeJS + NestJS, which was new for me. At first, I didn’t know how to handle it, but I found my way by learning the basics of NestJS and applying my ExpressJS logic to it.

Sometimes, I got stuck and even felt like giving up — but I didn’t stop. I used AI properly, combined it with my own logic, and also took some ideas directly from AI when needed.

For debugging and understanding things, I mainly used ChatGPT as my AI assistant.

I don’t think that’s a bad thing — I believe it’s fine to use AI to fill gaps when you don’t fully know a framework. In the end, I’m really happy that I did it this way. That’s how I built the backend.


📄 Frontend Routes

| Path                   | Page                             |
| ---------------------- | -------------------------------- |
| `/`                    | Login page                       |
| `/signup`              | Signup page                      |
| `/polling-page`        | Polls listing (public + private) |
| `/create-poll`         | Create poll (admin only)         |
| `/update-poll/:pollId` | Update poll (admin only)         |


🧠 My AI Journey & Debugging Story

I didn’t know NestJS before.
So:

Learned basics from docs + AI

Applied my Express logic in Nest

Used Postman to test APIs first

Used console.log & AI to debug

AI helped me plan React components & structure

Hardest parts:

Making private polls visible only to selected users

Disabling vote button if user already voted or poll expired

⚡ I used AI to help — but always kept my logic and understanding.


✏ How private polls work

Admin creates a private poll and selects allowed users by email

Backend saves these users' ObjectIds in allowedUser

When fetching private polls, backend shows:

polls created by the user or

polls where user is in allowedUser

So admin always sees their polls; users only see polls they’re allowed to see.

📄 License
MIT

✍ Author
Vishnu M R

This project shows:

You don’t need to know everything to start

AI can guide, but you should keep thinking & debugging

Learning by doing is powerful!

❤️ Thank you for reading!
Hope you enjoy the project.
```
