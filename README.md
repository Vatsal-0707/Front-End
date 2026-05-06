Travel-X

A full-stack travel planning web application where users can register, log in, explore destinations, 
create trips, and manage travel plans. The project also includes an admin panel for managing destinations.


---

## 🚀 Features

### 👤 User Features

* User Registration & Login
* Role-based Authentication
* Browse Travel Destinations
* Create and Manage Trips
* Budget Planning
* Local Storage Support
* Interactive UI

### 🛠️ Admin Features

* Admin Login Access
* Add New Destinations
* Delete Destinations
* Manage Destination Data

---

## 📁 Project Structure

```text
LakshyaProject/
│
├── admin.html
├── details.html
├── index.html
├── login.html
├── register.html
├── user.html
├── style.css
├── script.js
├── server.js
└── users.json
```

---

## 🧰 Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Storage

* JSON File Storage (`users.json`)
* Browser LocalStorage

---

## 📦 Dependencies

The project uses the following Node.js packages for backend functionality.

### Install All Dependencies

```bash
npm install express cors nodemon
```

---

### 📚 Dependency Information

| Package | Version Type           | Purpose                                                                                                                          |
| ------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| express | Production Dependency  | Used to create the backend server, define API routes, handle requests/responses, and manage application middleware.              |
| cors    | Production Dependency  | Enables Cross-Origin Resource Sharing so frontend pages can communicate with the backend server without browser blocking issues. |
| nodemon | Development Dependency | Automatically restarts the Node.js server whenever file changes are detected during development.                                 |

---

### 📥 Individual Installation Commands

#### Install Express

```bash
npm install express
```

#### Install CORS

```bash
npm install cors
```

#### Install Nodemon (Optional for Development)

```bash
npm install --save-dev nodemon
```

---

### 📄 Example package.json

```json
{
  "name": "lakshya-project",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

---

### ▶️ Running the Project in Development Mode

```bash
npm run dev
```

This command uses Nodemon to restart the server automatically whenever changes are made to the project files.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
```

### 2️⃣ Open Project Folder

```bash
cd LakshyaProject
```

### 3️⃣ Install Dependencies

```bash
npm install express cors
```

### 4️⃣ Run the Server

```bash
node server.js
```

Server will start on:

```text
http://localhost:3000
```

---

## ▶️ How to Use

1. Start the backend server.
2. Open `index.html` in your browser.
3. Register a new account.
4. Login as user or admin.
5. Explore destinations and create trips.
6. Admin can manage destinations.

---

## 🔐 Authentication

The project supports:

* User Role
* Admin Role
* LocalStorage-based session handling

---

## 🌍 API Endpoints

### Users

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| GET    | `/users`    | Get all users |
| POST   | `/register` | Register user |
| POST   | `/login`    | Login user    |

### Destinations

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/destinations`     | Get all destinations |
| POST   | `/destinations`     | Add destination      |
| DELETE | `/destinations/:id` | Delete destination   |

### Trips

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| GET    | `/trips` | Get all trips |
| POST   | `/trips` | Create trip   |

---

## 💡 Future Improvements

* Database Integration (MongoDB/MySQL)
* JWT Authentication
* Payment Gateway
* Responsive Mobile Design
* Cloud Deployment
* Trip Recommendation System

---

## 🐞 Known Issues

* Data resets when server restarts (except users.json)
* No password encryption currently implemented

---

## 📄 License

This project is created for educational purposes.

---

## 👨‍💻 Author

Developed as part of a web development project.
