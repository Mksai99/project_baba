# 🚀 Secure Attendance & QR Verification System

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Supabase DB](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Flask Backend](https://img.shields.io/badge/Backend-Flask-lightgrey?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)

> [!NOTE]
> **Secure Attendance & QR Verification System** is a high-performance, cloud-native attendance management system designed to streamline event check-ins and student verifications using real-time QR scanning and cloud synchronization.

---

## 📝 Project Description

### 🚩 The Problem
Organizing large-scale events or daily student check-ins often suffers from manual entry errors, slow processing times, and the lack of real-time data synchronization. Traditional systems often fail to prevent "buddy punching" or duplicate entries, leading to data integrity issues.

### 💡 The Solution
**Secure Attendance & QR Verification System** provides a seamless, automated solution. By leveraging client-side QR scanning and a Supabase-backed real-time database, it ensures that every entry is unique, verified, and logged instantly. The system features a robust admin dashboard for monitoring live stats, managing student records via Excel, and exporting verified data for administrative audits.

---

## ✨ Features

- **🔍 Real-time QR Scanning**: Integrated `html5-qrcode` scanner for rapid, touchless verification.
- **🛡️ Duplicate Entry Prevention**: Sophisticated backend logic to detect and flag previously scanned records.
- **📊 Live Analytics Dashboard**: Real-time tracking of Total Students, Scanned Count, and Remaining entries.
- **📂 Bulk Data Management**: Seamlessly upload thousands of records via `.xlsx` files.
- **📥 One-Click Export**: Download verified attendance data into professional Excel reports.
- **🔐 Secure Admin Access**: Role-based access control protecting the administrative dashboard and data management.
- **☁️ Cloud Integrated**: Powered by Supabase for high availability and real-time updates.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript, [html5-qrcode](https://github.com/mebjas/html5-qrcode) |
| **Backend** | Python, Flask, Flask-Login |
| **Database** | Supabase (PostgreSQL) |
| **Integrations** | Openpyxl (Excel Processing), Dotenv |
| **Deployment** | Vercel Serverless |

---

## 📂 Project Structure

```text
Project_Baba/
├── api/                   # Serverless Functions (Vercel)
│   └── index.py           # Core Backend Application
├── static/                # Static Assets
│   ├── css/
│   │   └── style.css      # Custom UI Styling
│   └── js/
│   │   └── scanner.js     # QR Scanning & UI Logic
├── templates/             # HTML View Templates
│   ├── index.html         # Scanner Interface
│   ├── admin.html         # Stats & Management Dashboard
│   └── login.html         # Admin Auth Page
├── requirements.txt       # Python Dependencies
├── vercel.json           # Vercel Configuration
└── .env                   # Environment Variables (Sensitive)
```

---

## 🚀 Installation & Setup

Follow these steps to get your local development environment running:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/secure-attendance-qr.git
cd secure-attendance-qr
```

### 2. Set Up Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
SECRET_KEY=your_random_secret_key
```

### 5. Run the Application
```bash
python api/index.py
```
> Access the application at `http://127.0.0.1:5000`

---

## 📖 Usage

### For Verifiers:
1. Navigate to the Home page.
2. Grant camera permissions when prompted.
3. Align the QR code within the scanner frame.
4. The system will provide instant visual and audio feedback (Authorized, Duplicate, or Not Found).

### For Admins:
1. Go to `/login` and enter your credentials.
2. Visit the `/admin` dashboard.
3. Use the **Upload Excel** feature to seed the database with student roll numbers.
4. Monitor live stats as scanning progresses.
5. Click **Export Data** to download the final attendance sheet.

---

## 🖼️ Screenshots / Demo

| Dashboard Overview | QR Scanner Interface |
| :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/400x250?text=Admin+Dashboard) | ![Scanner Placeholder](https://via.placeholder.com/400x250?text=QR+Scanner+UI) |

---

## ☁️ Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Add your `.env` variables to the Vercel Project Settings.
3. Vercel will automatically detect the `vercel.json` and deploy the Python app as a serverless function.

---

## 🔌 API Endpoints

- `GET /`: Main scanning interface.
- `POST /verify`: Endpoint for roll number/QR verification.
- `GET /admin`: Dashboard view (Requires Login).
- `POST /upload`: Bulk upload student records.
- `GET /api/stats`: Fetch real-time scanning statistics.
- `GET /export`: Download verified records in `.xlsx` format.

---

## 🏛️ Architecture Overview

The application follows a **Serverless Monolith** architecture:
1. **Request Flow**: User actions on the frontend trigger calls to the Flask API hosted on Vercel.
2. **Logic Layer**: The API processes business rules (e.g., verifying if a roll number is already scanned).
3. **Data Layer**: Supabase acts as the persistent storage, handling the mapping of student records and their scan states.
4. **Security**: `Flask-Login` manages session persistence for the admin dashboard.

---

## 🎓 Learning Outcomes

- Implementing **QR Code processing** in browser-based environments.
- Architectural design for **Serverless Python** deployments.
- Integration of **Real-time databases** (Supabase) with traditional web frameworks.
- Handling **Bulk Data Processing** and file I/O in a web context.

---

## 🧠 Challenges & Solutions

| Challenge | Solution |
| :--- | :--- |
| **Vercel Read-Only FS** | Implemented `/tmp` directory usage for temporary Excel file generation during export. |
| **Data Synchronization** | Leveraged Supabase's immediate consistency to prevent race conditions during scanning. |
| **Camera Access** | Optimized `html5-qrcode` config for environment-facing cameras to ensure better mobile UX. |

---

## 🔮 Future Improvements

- [ ] Support for multiple simultaneous events within the same dashboard.
- [ ] Automated email/SMS notifications for student entry.
- [ ] Native Mobile App integration via Flutter or React Native.
- [ ] Offline-first scanning support with local storage sync.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author / Contact

**Krishna Sai** - [@mksai99](https://github.com/mksai99)
- Project Link: [https://github.com/mksai99/secure-attendance-qr](https://github.com/mksai99/secure-attendance-qr)
- Email: [mksai99@example.com](mailto:mksai99@example.com)

---
*Generated with ❤️ by Secure Attendance Team*
