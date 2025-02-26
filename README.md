# Movie Directory

Welcome to Movie Directory, a web application that lets users explore movie data with a seamless login/signup experience. Browse movies pulled from The Movie Database (TMDB) and enjoy a user-friendly interface powered by modern web technologies.

## Features

-   **User Authentication**: Secure login and signup via Appwrite.
-   **Movie Data**: Fetches movie details from The Movie Database (TMDB) API.
-   **Responsive Design**: Built with React and Vite for a fast, smooth experience.

## Tech Stack

-   **Appwrite**: Backend-as-a-Service for user authentication.
-   **The Movie Database (TMDB)**: Source of movie data via API.
-   **Vite**: Frontend tooling for rapid development.
-   **React**: UI library for building the interface.

## Prerequisites

To run this project locally, you’ll need accounts and API keys from the following services:

1. **Appwrite**: For authentication and movie data storage.
    - Create an account at https://cloud.appwrite.io/console/.
    - Set up a project to get your Project ID.
2. **The Movie Database (TMDB)**: For movie data. - Sign up at [https://www.themoviedb.org/](https://www.themoviedb.org/). - Generate an API key (see [TMDB API Docs](https://developer.themoviedb.org/reference/intro/getting-started) for details).
   You’ll also need:

-   Node.js (v16 or later) and npm installed.

## Setup Instructions

Follow these steps to get Movie Directory running locally:

### 1.Clone the Repository

```
git clone https://github.com/tristonchai/movie-directory.git\n
cd movie-directory
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Appwrite

Appwrite handles both user authentication and the Trending Movie section. Configure it as follows:
**Authentication**

-   In the Appwrite Console, create a new project (e.g., "MovieDirectory").
-   Note your **Project ID** from the project settings.
    **Trending Movies Database**

1. Create a Database
    - Go to the "Database" tab in your Appwrite project.
    - Click "Create Database" and name it (e.g., movies—any name works).
    - Save the **Database ID** from the database settings.
2. Create a Collection:
    - Inside your database, click "Create Collection" and name it (e.g., metrics—any name works).
    - Save the **Collection ID** from the collection settings.
3. Add Attributes:
    - Navigate to the "Attributes" tab in your collection.
    - Create these four attributes:
      | Type | Attribute Key | Settings |
      | ----------- | ----------- | ----------- |
      | String | searchTerm | Size: 1000, Required: Yes |
      | Integer | count | Default: 1 |
      | URL | poster_url | Required: Yes |
      | Integer | movie_id | Required: Yes |
    - These store trending movie data like search terms, view counts, poster URLs, and TMDB movie IDs.

### 4. Configure Environment Variables

Create a file named .env.local in the project root and add these keys:

```
VITE_TMDB_API_KEY=your-tmdb-api-key
VITE_APPWRITE_PROJECT_ID=your-appwrite-project-id
VITE_APPWRITE_DATABASE_ID=your-appwrite-database-id
VITE_APPWRITE_COLLECTION_ID=your-appwrite-collection-id
```

-   Replace your-tmdb-api-key with your TMDB API key.
-   Replace the Appwrite variables with your Project ID, Database ID, and Collection ID from the steps above.
    Note: Keep .env.local secure—it’s ignored by .gitignore to protect sensitive data.

### 5. Run the App

Start the development server:

```
npm run dev
```

-   Open http://localhost:5173 (or the assigned port) in your browser.
-   Log in or sign up, then explore trending movies and TMDB data!

## Contributing

Fork this repo, submit issues, or send pull requests to enhance Movie Directory—we’d love your input!

## License

This project is open-source under the MIT License (LICENSE).
