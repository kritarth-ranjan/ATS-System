# ATS-System

A comprehensive **Applicant Tracking System (ATS)** built with Python, JavaScript, HTML, and CSS. This non-agentic system provides a complete solution for managing job applications, candidates, and recruitment workflows with an intuitive user interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

ATS-System is a modern, web-based Applicant Tracking System designed to streamline the recruitment process. It enables HR teams and hiring managers to efficiently manage job postings, track candidate applications, and maintain a structured database of applicants throughout the hiring lifecycle.

### Key Objectives

- **Centralized Candidate Management**: Store and organize all applicant information in one secure location
- **Workflow Automation**: Streamline recruitment processes from posting to hiring
- **Intuitive Interface**: User-friendly dashboard for easy navigation and management
- **Data Analysis**: Track recruitment metrics and generate insights
- **Scalability**: Handle growing volumes of applications efficiently

## 🛠️ Technology Stack

### Backend
- **Python** (39.7%) - Core application logic, API endpoints, and data processing
  - Web Framework: Flask/Django
  - Database ORM: SQLAlchemy
  - Data Validation: Pydantic
  - Task Queue: Celery (optional)

### Frontend
- **JavaScript** (36.8%) - Client-side interactions and dynamic features
  - Framework: React/Vue.js
  - State Management: Redux/Vuex
  - HTTP Client: Axios
  - Build Tool: Webpack/Vite

- **HTML** (12.2%) - Markup and semantic structure
  - Template Engine: Jinja2/EJS
  - Web Components: Custom elements

- **CSS** (11.3%) - Styling and responsive design
  - Preprocessor: SASS/LESS
  - Framework: Bootstrap/Tailwind CSS
  - Layout: Flexbox, CSS Grid

### Additional Technologies
- **Database**: PostgreSQL/MySQL
- **Caching**: Redis
- **Authentication**: JWT/OAuth 2.0
- **File Storage**: AWS S3 or Local Storage
- **Deployment**: Docker, Docker Compose

## ✨ Features

### Core Features

#### 1. **Job Management**
- Create, edit, and publish job postings
- Define job requirements and qualifications
- Set application deadlines
- Manage multiple job openings
- Job categorization and filtering

#### 2. **Candidate Management**
- Register and profile candidates
- Track application status
- View candidate resumes and portfolios
- Manage candidate communications
- Add notes and tags for better organization

#### 3. **Application Tracking**
- Automated application submission tracking
- Multiple status stages (Applied, Reviewed, Shortlisted, Interviewed, Offered, Hired, Rejected)
- Real-time status updates
- Application pipeline visualization
- Bulk operations on applications

#### 4. **Interview Management**
- Schedule interviews
- Set interview panels and interviewers
- Track interview feedback
- Interview question templates
- Automated interview reminders

#### 5. **Reporting & Analytics**
- Application statistics and metrics
- Time-to-hire calculations
- Candidate source tracking
- Pipeline reports
- Export reports in multiple formats (PDF, Excel)

#### 6. **User Management**
- Role-based access control (Admin, HR, Hiring Manager, Interviewer)
- User authentication and authorization
- Activity logging and audit trails
- Team management

#### 7. **Communication**
- Email notifications for candidates
- Internal messaging between team members
- Automated email templates
- SMS notifications (optional)

#### 8. **Search & Filtering**
- Advanced search capabilities
- Filter by status, skills, experience, location
- Saved search queries
- Full-text search across resumes

## 📁 Project Structure

```
ATS-System/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── candidate.py
│   │   │   ├── job.py
│   │   │   ├── application.py
│   │   │   └── interview.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── candidates.py
│   │   │   ├── jobs.py
│   │   │   ├── applications.py
│   │   │   └── interviews.py
│   │   ├── schemas/
│   │   │   └── validators.py
│   │   ├── services/
│   │   │   ├── candidate_service.py
│   │   │   ├── job_service.py
│   │   │   └── email_service.py
│   │   └── utils/
│   │       ├── decorators.py
│   │       ├── helpers.py
│   │       └── constants.py
│   ├── migrations/
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── fixtures/
│   ├── requirements.txt
│   └── wsgi.py
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── styles/
│   │   │   └── icons/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── CandidateList/
│   │   │   ├── JobBoard/
│   │   │   ├── ApplicationTracker/
│   │   │   └── Common/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Candidates.jsx
│   │   │   ├── Jobs.jsx
│   │   │   └── Interviews.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── state/
│   │   │   ├── store.js
│   │   │   └── reducers/
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── database/
│   ├── schema.sql
│   └── migrations/
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
├── docs/
│   ├── API.md
│   ├── SETUP.md
│   └── USER_GUIDE.md
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

## 🚀 Installation

### Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 12+
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kritarth-ranjan/ATS-System.git
   cd ATS-System
   ```

2. **Create Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize database**
   ```bash
   python -m flask db upgrade
   ```

6. **Start the backend server**
   ```bash
   python app/main.py
   # Server runs on http://localhost:5000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # Server runs on http://localhost:5173
   ```

### Using Docker Compose

```bash
docker-compose up -d
# Backend: http://localhost:5000
# Frontend: http://localhost:3000
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ats_db
SQLALCHEMY_TRACK_MODIFICATIONS=False

# Flask
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here

# JWT
JWT_SECRET_KEY=your-jwt-secret-key
JWT_ACCESS_TOKEN_EXPIRES=3600

# Email Configuration
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=ats-system-bucket

# Redis (Optional)
REDIS_URL=redis://localhost:6379/0

# Frontend
VITE_API_URL=http://localhost:5000/api
```

## 📖 Usage

### For HR/Admin Users

1. **Login**: Access the dashboard at `http://localhost:3000`
2. **Create Job**: Navigate to Jobs → Create New Job
3. **Track Applications**: View all applications in the Application Tracker
4. **Schedule Interviews**: Book interviews and set reminders
5. **Generate Reports**: Create reports for recruitment metrics

### For Candidates

1. **Apply**: Browse open positions and submit applications
2. **Track Status**: Monitor application progress
3. **Upload Documents**: Add resume and portfolio files
4. **Receive Updates**: Get notifications on application status

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All endpoints (except login/register) require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

### Key Endpoints

#### Users
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /users/<id>` - Get user profile
- `PUT /users/<id>` - Update user profile

#### Candidates
- `GET /candidates` - List all candidates
- `POST /candidates` - Create candidate
- `GET /candidates/<id>` - Get candidate details
- `PUT /candidates/<id>` - Update candidate
- `DELETE /candidates/<id>` - Delete candidate

#### Jobs
- `GET /jobs` - List all jobs
- `POST /jobs` - Create job posting
- `GET /jobs/<id>` - Get job details
- `PUT /jobs/<id>` - Update job
- `DELETE /jobs/<id>` - Delete job

#### Applications
- `GET /applications` - List applications
- `POST /applications` - Submit application
- `GET /applications/<id>` - Get application details
- `PUT /applications/<id>` - Update application status
- `DELETE /applications/<id>` - Withdraw application

#### Interviews
- `GET /interviews` - List interviews
- `POST /interviews` - Schedule interview
- `PUT /interviews/<id>` - Update interview
- `DELETE /interviews/<id>` - Cancel interview

## 💾 Database Schema

### Key Tables

**users**
- id, email, password_hash, first_name, last_name, role, created_at, updated_at

**candidates**
- id, email, phone, resume_url, skills, experience, created_at, updated_at

**jobs**
- id, title, description, requirements, location, salary_range, status, created_at, updated_at

**applications**
- id, candidate_id, job_id, status, applied_at, reviewed_at, updated_at

**interviews**
- id, application_id, interview_date, interviewer_id, feedback, rating, created_at

## 🔧 Development

### Running Tests

```bash
# Backend tests
cd backend
pytest tests/ -v

# Frontend tests
cd frontend
npm run test
```

### Code Quality

```bash
# Linting (Backend)
flake8 app/

# Formatting (Backend)
black app/

# Linting (Frontend)
npm run lint

# Formatting (Frontend)
npm run format
```

### Building for Production

```bash
# Backend
cd backend
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# Frontend
cd frontend
npm run build
# Output in dist/ directory
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Follow PEP 8 for Python code
- Use ESLint/Prettier for JavaScript
- Add unit tests for new features
- Update documentation accordingly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For issues, questions, or suggestions:

- **Issues**: Open an issue on GitHub
- **Email**: [your-email@example.com]
- **Documentation**: Check `/docs` folder

## 🎉 Acknowledgments

- Built with Flask and React
- Inspired by modern ATS platforms
- Community contributions and feedback

---

**Last Updated**: 2026-01-06  
**Version**: 1.0.0  
**Status**: Active Development

