# Connect-U: Fair Labor, Fair Wages

**Connect-U** is a dynamic platform that directly connects daily wage laborers with contractors and customers, ensuring **fair wages** and eliminating financial exploitation. This project enhances job accessibility and transparency in the unorganized labor sector.

## 🚀 Features

- **Laborer-Contractor Matching:** Smart search and filtering based on **location, ratings, and skills**.
- **Role-Based Access Control:** Secure **registration and authentication** for laborers and employers.
- **Real-Time Job Notifications:** Instant job offers and updates using **Twilio API**.
- **Secure Payment System:** Integrated **Razorpay API** for safe and direct transactions.
- **User-Friendly Interface:** **React.js**-powered intuitive dashboard for seamless job management.
- **Scalability & Data Management:** **MongoDB**-backed secure and efficient database system.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, OAuth
- **APIs & Services:** Razorpay API, Twilio API
- **Deployment & DevOps:** Docker, Kubernetes

## 📦 Installation

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/Aman-mania/Connect-U.git
   cd Connect-U
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:
Create a .env file in the root directory with the following:**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_api_key
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

4. **Start the Server:**

```bash
npm start
```
The backend will run on http://localhost:5000.

**🔗 API Endpoints**

  **User Authentication::**
  
  POST /api/auth/register - Register a new user (laborer or contractor)
  POST /api/auth/login - Authenticate user and return JWT token

  **Job Management:**
  
  GET /api/jobs - Fetch available jobs
  POST /api/jobs/create - Post a new job (contractors only)
  PUT /api/jobs/accept/:id - Accept a job (laborers only)

  **Payments & Notifications:**
  
  POST /api/payments/process - Secure payment processing via Razorpay
  GET /api/notifications - Retrieve real-time job notifications

**🎯 How It Works:**

Contractors post job listings specifying skills, location, and wages.
Laborers receive real-time job notifications and apply for suitable opportunities.
Secure Payments are processed via Razorpay, ensuring fair transactions.
Ratings & Reviews help contractors and laborers build trust within the platform.
