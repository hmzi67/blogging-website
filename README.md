# Next.js Blog Application

## Overview

This is a blog application built using Next.js and Firebase. It allows users to create, read, and manage blog posts with image uploads.

## Features

- **Create Blog Posts**: Users can create new blog posts with titles, content, and images.
- **Read Blog Posts**: Users can view a list of all blog posts and navigate to individual posts.
- **Image Uploads**: Supports uploading images to Firebase Storage.

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **Firebase**: Cloud-based platform for building applications, including Firestore and Storage.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
```

2. Navigate to the project directory:
```bash
    cd your-repo-name
```

3. Install dependencies:
```bash
    npm install
```

4. Create a .env.local file in the root directory and add your Firebase configuration:
```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

```

### Running the Application
```bash
    npm run dev
```

### API Endpoints
- POST /api/posts: Create a new blog post.
- GET /api/posts: Retrieve all blog posts.

### Folder Structure
```bash
your-repo-name/
├── public/          # Static assets
├── src/
│   ├── app/        # Next.js application structure
│   ├── components/  # Reusable components
│   ├── firebase/    # Firebase configuration and setup
│   └── styles/      # Global styles
├── .env.local       # Environment variables
├── package.json      # Project metadata and dependencies
└── README.md        # Project documentation
```
