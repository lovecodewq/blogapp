# Blog App Using React and Appwrite

## Introduction

This blog app is a personal project designed to explore the capabilities of React and Appwrite, focusing on creating a user-friendly platform for personal and professional blogging. It supports text and image posts, offering a rich editing experience.

## Features

- User authentication and registration
- Creating, editing, and deleting blog posts
- Integrating editor from TinyMCE
- Responsive design

## Technologies Used

- React.js
- TypeScript
- Appwrite
- tailwindcss for styling
- reduxjs and redux toolkit for global state management
- tinymce for post edit
- vite

## Getting Started

### Configuring Environment Variables
Before running the app, configure the required environment variables in a `.env` file in the project directory. Here's a brief explanation of each:
- `VITE_APPWRITE_URL`: The URL of your Appwrite server.
- `VITE_APPWRITE_PROJECT_ID`: Your Appwrite project ID.
- `VITE_APPWRITE_DATABASE_ID`: The database ID where your blog posts are stored.
- `VITE_APPWRITE_COLLECTION_ID`: The collection ID used for blog posts.
- `VITE_APPWRITE_BUCKET_ID`: The bucket ID for storing images.
- `VITE_TINYMCE_API_KEY`: Your TinyMCE API key for the rich text editor.

- Please refer to [Appwrite's React Quick-Start Guide](https://appwrite.io/docs/quick-starts/react) to set up your Appwrite service.
- Refer to [TinyMCE's React Integration Documentation](https://www.tiny.cloud/docs/tinymce/latest/react-cloud/) to get an API key.


### Run dev
To clone and run the development server:
```bash
git clone git@github.com:lovecodewq/blogapp.git
cd blogapp
npm install
npm run dev

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
