# Next.js Feedback System

This is a Next.js application for managing events and user feedback. The application includes JWT-based authentication, a feedback system, and an admin dashboard.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git

## Running the Application

1. **Add the enviroment variables**:

   ```bash
   MONGODB_URI=mongodb://your_mongo_db_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE= your_jwt_expire

## Folder Structure
Event MAnagement/
├── components/
│   ├── DataTable/
│   │   └── DataTable.tsx
│   ├── Feedback/
│   │   └── FeedbackForm.tsx
│   └── ui/
│       └── ...
├── models/
│   └── feedback.ts
├── pages/
│   ├── api/
│   │   ├── feedback/
│   │   │   ├── create/
│   │   │   │   └── route.ts
│   │   │   ├── update/
│   │   │   │   └── route.ts
│   │   │   ├── delete/
│   │   │   │   └── route.ts
│   │   │   ├── getAll/
│   │   │   │   └── route.ts
│   │   │   ├── getByEventId/
│   │   │   │   └── route.ts
│   │   │   └── getById/
│   │   │       └── route.ts
│   │   └── events/
│   │       └── route.ts
│   └── index.tsx
├── styles/
│   └── ...
├── utils/
│   └── ...
├── .env.local
├── package.json
└── README.md


### Instructions for Use
1. **Update the Repository Link**: Replace `https://github.com/yourusername/your-repo-name.git` with the actual URL of your repository.
  
2. **Add Your Own Environment Variables**: Make sure to include the necessary environment variables in the `.env.local` section, adjusting according to what your application requires.

3. **Additional Sections**: Feel free to add any additional sections or notes specific to your project, such as features, known issues, or usage instructions.

This `README.md` will give users clear instructions on how to set up and run the application locally, along with an overview of the folder structure and available API endpoints. Let me know if you need any more modifications!
