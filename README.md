## TO-DO App 

This project is a full-stack To-Do application, allowing users to create, manage, and track their tasks. The application includes a front-end built with React and a back-end powered by Node.js, Express, and MongoDB.

## Features
- User authentication (Sign up, Login, Logout)
- User Info (view , update and delete user)
- Create, edit, and delete tasks
- Mark tasks as completed
- View tasks by status (All, Completed, Late, Due Today)
- Home page to view app features
- contact us
- Dark mode toggle
- Responsive design

#### Technologies Used
- ##### Front-End
    - React
    - React Router
    - Bootstrap
    - Axios
    - Formik & Yup (for form validation)
    - React Toastify (for notifications)
- ##### Back-End
    - Node.js
    - Express
    - MongoDB & Mongoose
    - JWT (JSON Web Token) for authentication
    - bcrypt.js for password hashing
  
### Installation
- ##### Prerequisites
    - Node.js installed
    - MongoDB installed and running

- ##### Clone the Repository

```bash
git https://github.com/MennaAllahZakaria/TO_DO-APP
```
- #### Front-End Installation 
    ```bash
    cd client
    npm install
    ```
- #### Back-End Installation 
    ```bash
    npm install
    ```
- #### Environment Variables
  Create a .env file in both the frontend and backend directories with the following variables:
    - Front-End environment variables
    ```arduino
    VITE_API_URL=YOUR_API_URL
    ``` 
  - -----------------------------------
  - Back-End environment variables
    ```arduino
        PORT=8000
        BASE_URL=http://localhost:8000 (for example)
        NODE_ENV=development
        DB_USER=your data base user 
        DB_PASSWORD=data base password
        DB_NAME=data base name
        DB_URI=data base url

        SALT=Salt number

        JWT_SECRET=jwt secret string
        JWT_EXPIRE_IN=90d


        #EMAIL

        EMAIL_HOST= email of host
        EMAIL_PORT=465
        EMAIL_USER=email user
        EMAIL_PASS=email password
        EMAIL_FROM="E-shop App "
    ``` 

### Running the App
- Back-End
  Start the server:
  ```bash
    npm run start:dev
  ```
- Front-End
  Start the server:
  ```bash
    cd client
    npm run start:dev
  ```


### Contributing

Contributions are welcome! Please follow these steps:

- 1- Fork the repository.
- 2- Create a new branch (git checkout -b feature/your-feature-name).
- 3- Make your changes.
Commit your changes (git commit -m 'Add some feature').
- 4- Push to the branch (git push origin feature/your-feature-name).
- 5- Create a Pull Request.
