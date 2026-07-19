# 💸 Expense Tracker

A modern and responsive **Expense Tracker** built with **React.js** that helps users manage their daily expenses efficiently. Easily add, view, and delete transactions while keeping track of your total balance, income, and expenses in real time.

---

## 🚀 Live Demo

🔗 https://expense-tracker-client-ljs9.onrender.com/

---

## ✨ Features

- ➕ Add new income and expense transactions
- 🗑️ Delete transactions
- 💰 Real-time balance calculation
- 📈 Income & expense summary
- ⚡ Instant UI updates with React State
- 📱 Fully Responsive Design
- 🎨 Clean and modern interface
- 📅 Date-wise transaction history
- 🔍 Search & Filter transactions
- 📊 Charts & Analytics

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| ⚛️ React.js | Frontend Framework |
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript (ES6+) | Functionality | API |
| Backend | API |

---

## 📂 Project Structure

```
Expense-Tracker/
│
├── client/                 (React Frontend)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── BudgetCard.jsx
│   │   │   ├── PieChart.jsx
│   │   │   └── MonthlyChart.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── ForgotPassword.jsx   (Kal banega)
│   │   │   └── ResetPassword.jsx    (Kal banega)
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/                 (Node.js + Express Backend)
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   └── transactionController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── transactionRoutes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/pratibhasaini2005/expense-tracker.git
```

Go to the project directory

```bash
cd expense-tracker
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

The application will run at:

```
http://localhost:5000
```

---

## 📖 How It Works

1. Enter the transaction name.
2. Enter the amount.
   - Positive amount ➜ Income
   - Negative amount ➜ Expense
3. Click **Add Transaction**.
4. View updated Balance, Income, and Expenses instantly.
5. Delete transactions whenever needed.

---

## 🎯 Future Improvements

- 🌙 Dark Mode
- ☁️ Firebase/MongoDB integration


---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Pratibha Saini**

GitHub: https://github.com/pratibhasaini2005

---

## ⭐ Show Your Support

If you like this project, please consider giving it a **⭐ Star** on GitHub!

---

<p align="center">
Made with ❤️ using React
</p>
