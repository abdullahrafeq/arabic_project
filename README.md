# arabic_project
A web app to explore inspiring quotes, books, and profiles of scholars — with account creation, favorites, and reviews.

🎥 **Demo video**: <br />
[![Watch the demo](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)] https://github.com/user-attachments/assets/0870b515-279b-472c-9e97-aa63a7c1fe96

## 🛠 Tech Stack
- **Frontend**: ReactJS
- **Backend**: Django
- **Authentication**: JWT (JSON Web Tokens)

## 🚀 Features
- 🔐 Secure user login and JWT-based authentication
- 📚 Search for books and scholars
- ⭐ Add favorites (books and scholars)
- 📝 Write and view user reviews
- 🛠 Admin tools to manage content

## ⚙️ How to Run Locally
### 1. Clone the repository

```bash
git clone https://github.com/abdullahrafeq/arabic_project.git
cd arabic_project
```

### 2. Start the Django backend
```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
The backend will run on: ```http://127.0.0.1:8000```

### 3. Start the React frontend
```bash
cd client
npm install
npm start
```
The frontend will run on: ```http://localhost:3000```
✅ You can now visit the app at: http://localhost:3000 and interact with both frontend and backend locally.

## 👤 Author
Abdullah Rafeq
