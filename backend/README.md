# SwiftClaim Backend API Documentation

## Base URLs
- Authentication: `http://localhost:3000/api/auth`
- Insurance Claims: `http://localhost:3000/api/insurance`

## Authentication Endpoints

### 1. Register New User
Creates a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body (Regular User):**
```json
{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+91-9876543210",
    "password": "securePassword123",
    "address": "123 Main Street, Mumbai, MH 400001",
    "upi_id": "johndoe@upi",
    "role": "customer"
}
```

**Request Body (Insurer):**
```json
{
    "fullName": "Jane Smith",
    "email": "jane.smith@insurance.com",
    "phone": "+91-9876543211",
    "password": "securePassword123",
    "address": "456 Business Park, Mumbai, MH 400002",
    "upi_id": "janesmith@upi",
    "role": "insurer",
    "company_name": "SafeGuard Insurance Ltd",
    "registration_number": "INS123456",
    "company_type": "health_insurance",
    "designation": "Senior Claims Manager"
}
```

**Notes:**
- `role` is optional, defaults to "customer" if not provided
- `role` must be one of: "customer", "admin", "insurer", "agent"
- `upi_id` is optional but must be in format "username@provider" if provided
- For role "insurer", additional fields are required:
  - `company_name`: Name of the insurance company
  - `registration_number`: Company registration number
  - `company_type`: Must be either "health_insurance" or "travel_insurance"
  - `designation`: Role/position in the company

**Response (201 Created) - Regular User:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
        "userId": 1,
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "role": "customer",
        "upi_id": "johndoe@upi"
    }
}
```

**Response (201 Created) - Insurer:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
        "userId": 2,
        "fullName": "Jane Smith",
        "email": "jane.smith@insurance.com",
        "role": "insurer",
        "upi_id": "janesmith@upi",
        "company_name": "SafeGuard Insurance Ltd",
        "company_type": "health_insurance"
    }
}
```

**Error Responses:**

Invalid Role (400 Bad Request):
```json
{
    "error": "Invalid role",
    "message": "Role must be one of: customer, admin, insurer, agent"
}
```

Missing Insurer Details (400 Bad Request):
```json
{
    "error": "Missing insurer details",
    "message": "Company name, registration number, company type, and designation are required for insurers"
}
```

Invalid Company Type (400 Bad Request):
```json
{
    "error": "Invalid company type",
    "message": "Company type must be either health_insurance or travel_insurance"
}
```

Invalid UPI ID (400 Bad Request):
```json
{
    "error": "Invalid UPI ID",
    "message": "UPI ID must be in the format username@provider"
}
```

User Exists (400 Bad Request):
```json
{
    "error": "User already exists"
}
```

### 2. Login User
Authenticates a user and returns a JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
        "userId": 1,
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "role": "customer"
    }
}
```

**Error Response (401 Unauthorized):**
```json
{
    "error": "Invalid credentials"
}
```

### 3. Get User Profile
Retrieves the authenticated user's profile.

**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK) - Regular User:**
```json
{
    "user": {
        "user_id": 1,
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+91-9876543210",
        "role": "customer",
        "address": "123 Main Street, Mumbai, MH 400001",
        "upi_id": "johndoe@upi"
    }
}
```

**Response (200 OK) - Insurer:**
```json
{
    "user": {
        "user_id": 2,
        "full_name": "Jane Smith",
        "email": "jane.smith@insurance.com",
        "phone": "+91-9876543211",
        "role": "insurer",
        "address": "456 Business Park, Mumbai, MH 400002",
        "upi_id": "janesmith@upi",
        "company_name": "SafeGuard Insurance Ltd",
        "registration_number": "INS123456",
        "company_type": "health_insurance",
        "designation": "Senior Claims Manager"
    }
}
```

### 4. Update User Profile
Updates the authenticated user's profile information.

**Endpoint:** `PUT /api/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Request Body (Regular User):**
```json
{
    "fullName": "John M. Doe",
    "phone": "+91-9876543210",
    "address": "456 New Street, Mumbai, MH 400001",
    "upi_id": "johnmdoe@upi"
}
```

**Request Body (Insurer):**
```json
{
    "fullName": "Jane M. Smith",
    "phone": "+91-9876543211",
    "address": "789 Corporate Park, Mumbai, MH 400002",
    "upi_id": "janemsmith@upi",
    "company_name": "SafeGuard Insurance Ltd",
    "registration_number": "INS123456",
    "company_type": "health_insurance",
    "designation": "Chief Claims Officer"
}
```

**Notes:**
- For insurers, all company-related fields are optional during update
- If updating `company_type`, it must be either "health_insurance" or "travel_insurance"

**Response format is same as Get Profile endpoint**

## Insurance Claims Endpoints

### 1. Get Pending Claims
Retrieves all pending insurance claims.

**Endpoint:** `GET /api/insurance/pending-claims`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK):**
```json
{
    "success": true,
    "count": 2,
    "claims": [
        {
            "claim_id": 1,
            "claim_amount": "85000.00",
            "claim_status": "pending",
            "claim_type": "health",
            "filing_date": "2024-03-22T12:00:00.000Z",
            "policyholder_name": "John Doe",
            "policy_number": "POL123456789"
        }
    ]
}
```

### 2. Get Claim Details
Retrieves details of a specific claim.

**Endpoint:** `GET /api/insurance/claim/:claimId`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK):**
```json
{
    "claim_id": 1,
    "user_id": 1,
    "policy_number": "POL123456789",
    "claim_amount": "85000.00",
    "claim_status": "pending",
    "claim_type": "health",
    "filing_date": "2024-03-22T12:00:00.000Z",
    "incident_description": "Emergency Appendectomy",
    "aabha_id": "AABHA123456789",
    "policyholder_name": "John Doe",
    "policy_type": "health"
}
```

### 3. Submit New Claim
Creates a new insurance claim.

**Endpoint:** `POST /api/insurance/claim`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Request Body (Health Claim):**
```json
{
    "policyNumber": 123456789,
    "claimAmount": 85000,
    "incidentDescription": "Emergency Appendectomy Surgery",
    "billStartDate": "2024-03-15",
    "billEndDate": "2024-03-18",
    "aabhaId": "AABHA123456789"
}
```

**Request Body (Travel Claim):**
```json
{
    "policyNumber": 987654321,
    "claimAmount": 25000,
    "incidentDescription": "Flight Delay Compensation",
    "billStartDate": "2024-03-10",
    "billEndDate": "2024-03-10",
    "flightId": 123
}
```

**Notes:**
- `policyNumber` is now an integer (not a string)
- Health claims require `aabhaId`, travel claims require `flightId`
- Duplicate claims for the same user and policy are not allowed if there's an existing active claim

**Response (201 Created):**
```json
{
    "success": true,
    "claim": {
        "claimId": 1,
        "policyNumber": 123456789,
        "claimAmount": 85000,
        "claimType": "health",
        "status": "pending"
    },
    "blockchain": {
        "chainClaimId": "1",
        "transactionHash": "0x1234567890abcdef...",
        "blockchainStatus": "submitted_with_claim_id"
    }
}
```

**Error Responses:**

Policy Not Found (404 Not Found):
```json
{
    "error": "Policy not found or inactive",
    "details": "No active policy found with policy number: 123456789"
}
```

Duplicate Claim (409 Conflict):
```json
{
    "error": "Duplicate claim",
    "details": "An active claim (ID: 5, Status: pending) already exists for this policy",
    "existingClaimId": 5
}
```

Invalid Claim Amount (400 Bad Request):
```json
{
    "error": "Invalid claim amount",
    "details": "Claim amount must be greater than 0 and less than or equal to policy coverage (500000)"
}
```

Claim Type Mismatch (400 Bad Request):
```json
{
    "error": "Claim type mismatch",
    "details": "Cannot submit a health claim for a travel policy"
}
```

Missing Required Fields (400 Bad Request):
```json
{
    "error": "Missing AABHA ID",
    "details": "AABHA ID is required for health claims"
}
```
```json
{
    "error": "Missing Flight ID",
    "details": "Flight ID is required for travel claims"
}
```

### 4. Verify Claim
Verifies a claim by checking AABHA/flight records and blockchain validation.

**Endpoint:** `POST /api/insurance/claim/:claimId/verify`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Parameters:**
- `claimId` (path parameter): The ID of the claim to verify

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Claim verified successfully",
    "claimId": "1",
    "transactionHash": "0x1234567890abcdef..."
}
```

**Error Responses:**

Claim Not Found (404 Not Found):
```json
{
    "error": "Claim not found or not in pending status"
}
```

Verification Failed (500 Internal Server Error):
```json
{
    "error": "Error verifying claim",
    "details": "Claim amount exceeds hospital bill amount"
}
```

### 5. Process Claim
Processes a verified claim for payment.

**Endpoint:** `POST /api/insurance/claim/:claimId/process`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK):**
```json
{
    "claimId": "1",
    "paidAmount": "85000",
    "transactionHash": "0x1234567890abcdef..."
}
```

## AI Integration Endpoints

### 1. Generate AI Content
Uses Google's Gemini AI to generate content based on a given prompt.

**Endpoint:** `POST /api/insurance/ai/generate`

**Request Body:**
```json
{
    "prompt": "How does AI work?"
}
```

**Response (200 OK):**
```json
{
    "success": true,
    "prompt": "How does AI work?",
    "response": "AI, or artificial intelligence, works through complex algorithms and data processing..."
}
```

**Error Responses:**

Invalid Prompt (400 Bad Request):
```json
{
    "success": false,
    "error": "Invalid prompt",
    "details": "A text prompt is required"
}
```

AI Generation Error (500 Internal Server Error):
```json
{
    "success": false,
    "error": "Error generating AI content",
    "details": "API error message..."
}
```

## Error Responses

### Authentication Errors (401 Unauthorized)
```json
{
    "error": "No token provided"
}
```
```json
{
    "error": "Invalid token"
}
```

### General Errors (500 Internal Server Error)
```json
{
    "error": "Something went wrong!",
    "details": "Error details in development mode"
}
```

## Environment Variables Required
```env
PORT=3000
JWT_SECRET=your_secure_jwt_secret
CONTRACT_ADDRESS=your_contract_address
PROVIDER_URL=your_blockchain_provider_url
PRIVATE_KEY=your_private_key
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
``` 