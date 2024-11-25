# Export Management Platform for Indian SMBs

A comprehensive platform to streamline international export processes for Indian small and medium businesses. Built for the Amazon Hackathon.

## Features

- User Authentication & Authorization
- Shipment Management
- Document Management
- Real-time Carrier Integration
- Rate Comparison
- Schedule Management
- Document Upload & Verification

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- File Upload: Multer

## Prerequisites
AMAZON_REFRESH_TOKEN=your_refresh_token
AMAZON_CLIENT_ID=your_client_id
AMAZON_CLIENT_SECRET=your_client_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_SELLING_PARTNER_ROLE=your_role_arn
AMAZON_MARKETPLACE_ID=your_marketplace_id
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd amazon-exportSMB
```

2. Install Frontend Dependencies
```bash
npm install
```

3. Install Backend Dependencies
```bash
cd backend
npm install
```

4. Configure Environment Variables
- Copy `.env.example` to `.env` in the backend directory
- Update the environment variables as needed

5. Start MongoDB
- Make sure MongoDB is running on your system
- Default connection URL: mongodb://localhost:27017/freshfruits

6. Start the Backend Server
```bash
cd backend
npm run dev
```

7. Start the Frontend Development Server
```bash
# In a new terminal, from the project root
npm run dev
```

## API Documentation

### Authentication Endpoints
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Shipment Endpoints
- GET /api/shipments - Get all shipments
- GET /api/shipments/:id - Get single shipment
- POST /api/shipments - Create new shipment
- PUT /api/shipments/:id - Update shipment
- DELETE /api/shipments/:id - Delete shipment

### Document Endpoints
- GET /api/documents - Get all documents
- GET /api/documents/:id - Get single document
- POST /api/documents - Upload new document
- PUT /api/documents/:id - Update document metadata
- DELETE /api/documents/:id - Delete document

### Carrier Endpoints
- GET /api/carriers - Get available carriers
- POST /api/carriers/rates - Get shipping rates
- POST /api/carriers/schedules - Get carrier schedules
- POST /api/carriers/book - Book shipment with carrier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
