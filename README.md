Movie Search Application - Local Setup Instructions
===========================================

This is a React-based movie search application that uses the OMDB API to search for movies.

Prerequisites
------------
1. Node.js (v14 or higher)
2. npm (Node Package Manager)
3. OMDB API Key (Get it from: http://www.omdbapi.com/apikey.aspx)

Setup Steps
----------
1. Clone the repository to your local machine
   ```
   git clone [repository-url]
   cd [project-directory]
   ```

2. Install Dependencies
   ```
   npm install
   ```

3. Environment Setup
   - Create a .env file in the root directory
   - Add your OMDB API key:
     ```
     REACT_APP_OMDB_API_KEY=your_api_key_here
     ```

4. Start the Development Server
   ```
   npm start
   ```
   The application will start running at http://localhost:3000

Using the Application
-------------------
1. Once the application is running, you'll see a search bar in the navigation.
2. Enter a movie title in the search bar and press Enter or click the search button.
3. The application will display movie results from the OMDB API.
4. Click on any movie card to see more details.

Troubleshooting
--------------
1. If you see API errors, make sure your OMDB API key is correctly set in the .env file
2. If the application fails to start, try:
   - Clearing the npm cache: `npm cache clean --force`
   - Deleting node_modules and running `npm install` again

Need Help?
---------
If you encounter any issues, please:
1. Check if all dependencies are properly installed
2. Verify your API key is valid and properly configured
3. Check the console for any error messages 
