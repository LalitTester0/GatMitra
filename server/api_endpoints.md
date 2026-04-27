# Bachat Gat API Documentation

Below are the backend API endpoints currently constructed for the Mahila Bachat Gat platform.

---

## 1. Authentication Endpoints

These endpoints are responsible for issuing JWT tokens securely. 

### A. Super Admin Login
**Endpoint:** `POST /api/superadmin/login`
- **Description:** Verifies Superadmin password and returns a JWT token.
- **Request Body (JSON):**
  ```json
  {
    "username": "admin",
    "password": "superpassword123"
  }
  ```
- **Response Structure (JSON):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5c...",
    "message": "Superadmin logged in successfully"
  }
  ```

### B. Member/President Mobile OTP Request
**Endpoint:** `POST /api/auth/request-otp`
- **Description:** Requests a 4-digit OTP to be generated and attached to the user's mobile number.
- **Request Body (JSON):**
  ```json
  {
    "mobileNumber": "1234567890"
  }
  ```
- **Response Structure (JSON):**
  ```json
  {
    "message": "OTP sent successfully (Check server console for mock SMS)."
  }
  ```

### C. Member/President Verify OTP
**Endpoint:** `POST /api/auth/verify-otp`
- **Description:** Submits the 4-digit code. Returns a JWT session token if correct.
- **Request Body (JSON):**
  ```json
  {
    "mobileNumber": "1234567890",
    "otp": "4512"
  }
  ```
- **Response Structure (JSON):**
  ```json
  {
    "token": "eyJhb...",
    "message": "Login successful.",
    "member": {
        "id": "uuid",
        "fullName": "Laxmi Tai",
        "role": "ADMIN",
        "groupId": "group-uuid"
    }
  }
  ```

---

## 2. Super Admin Endpoints (Require SuperAdmin JWT Token)

You must attach the `Authorization` header containing `Bearer <your_token>` to access these.

### A. Create Bachat Gat & Map President
**Endpoint:** `POST /api/superadmin/create-group`
- **Description:** Dynamically creates a new group and creates an overarching member mapped with an `ADMIN` (President) role.
- **Headers:** `{ "Authorization": "Bearer <your_jwt_token>" }`
- **Request Body (JSON):**
  ```json
  {
    "groupName": "Saraswati Mahila Bachat Gat",
    "presidentName": "Priya Patil",
    "presidentMobile": "9876543210"
  }
  ```
- **Response Structure (JSON):**
  ```json
  {
    "message": "Group created successfully. President mapped.",
    "group": { "id": "uuid", "name": "...", "createdAt": "..." },
    "president": { "id": "..." }
  }
  ```
