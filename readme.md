# GC370

GC370 is a Task + Event listing application designed to help teachers efficiently manage tasks and events. The app provides a seamless authentication system with Google and email/password, and includes both light mode and dark mode for a customizable user experience.

## Features
- **Task Management:** Teachers can create, update, and delete tasks.
- **Event Listing:** Teachers can add and manage events.
- **Authentication:** Supports login via Google and email/password.
- **Dark Mode & Light Mode:** Users can switch between themes.

## Tech Stack
### Frontend:
- **Framework:** React (MERN Stack, JavaScript)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Authentication:** Firebase
- **Other Libraries:** Axios, Date-fns, Lucide-react, Motion, React-icons, React-toastify, React-masonry-css, React-router-dom, Js-cookie

### Backend:
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Firebase, Firebase-admin, JSON Web Token (JWT)
- **File Storage:** Cloudinary, Multer, Multer-storage-cloudinary
- **Security:** Bcryptjs, Cookie-parser, Cors, Dotenv
- **Logging:** Winston-daily-rotate-file
- **Email Notifications:** Nodemailer

## Installation
### Prerequisites:
- Node.js
- MongoDB
- Firebase Account

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/KousikBhowmik/GC37O.git
   cd GC370
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables:
   - Create a `.env` file in the root directory.
   - Add required API keys and configurations.
4. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```
5. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

## Development Dependencies
### Frontend:
- **Build Tools:** Vite, @vitejs/plugin-react
- **Linting & Formatting:** ESLint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, Globals
- **Types:** @types/react, @types/react-dom
- **Styling:** TailwindCSS

### Backend:
- **Development Server:** Nodemon

## Contributing
We welcome contributions! Feel free to submit issues and pull requests to improve GC370.

Happy Coding! 🚀

