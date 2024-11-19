# Plan Management API

This is a RESTful API built with Node.js and MongoDB for managing subscription plans.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Postman (for testing)

## Installation

1. Clone the repository
```bash
git clone https://github.com/bhaviknetam/plan-management-api
cd plan-management-api
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory and add:
```
MONGODB_URI=mongodb://localhost:27017/plan-management
PORT=3000
```

4. Start the server
```bash
npm run dev
```

## API Endpoints

### Plans

- **Create Plan**
  - POST `/api/plans`
  - Body: 
    ```json
    {
      "name": "Basic Plan",
      "description": "Perfect for starters",
      "price": 99,
      "duration": "monthly",
      "features": ["Feature 1", "Feature 2"],
      "category": "individual",
      "isPopular": false
    }
    ```

- **Get All Plans**
  - GET `/api/plans`
  - Query Parameters:
    - category (string)
    - duration (string)
    - minPrice (number)
    - maxPrice (number)
    - sortBy (string, format: "field:order")

- **Get Single Plan**
  - GET `/api/plans/:id`

- **Update Plan**
  - PUT `/api/plans/:id`
  - Body: Same as Create Plan

- **Delete Plan**
  - DELETE `/api/plans/:id`

## Testing with Postman

1. Import the provided Postman collection
2. Create a new environment and set the variable:
   - `base_url`: `http://localhost:3000`
3. Use the imported collection to test all endpoints

The Postman collection includes examples for all endpoints with proper request bodies and parameters.
