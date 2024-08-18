# TODO APP

## This is ToDo app API with NodeJs and mongoodb

## Installation

- ##### Prerequisites

- [Node.js](https://nodejs.org/) 4.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)

- ##### Clone the Repository

```bash
git https://github.com/MennaAllahZakaria/TO_DO-APP/tree/main/server
cd server
```

- Install Dependencies

```bash
npm install
# or
yarn install
 ```

- ##### Set Up Environment Variables

Create a .env file in the root directory and add the following:

```plaintext

PORT=8000
BASE_URL=http://localhost:8000
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

- ##### Running the Server
  
Start the server using:

```bash

npm run start:dev
# or
yarn run start:dev
```

-    --------------

### Features

- User Authentication & Authorization: JWT-based authentication for user registration, login,change password,reset password with email code and management.
- User can Create,get,update,delete tasks
  
- Tasks Management: Create, read, update, and delete tasks.

-    --------------

### Usage

###### API Documentation

The API follows RESTful principles. Use tools like [Postman](https://www.postman.com/) to interact with the API.

##### My Postman Collection [Collection](https://www.postman.com/spaceflight-technologist-72474405/workspace/todo/collection/29296726-48528f35-0e27-4330-95ae-331d5f51a3de?action=share&creator=29296726)

-    --------------

#### API Endpoints

- User
  - Create user `POST  /api/users` (Only Admin or manager)
  - Get specific User by id `GET /api/users/:id` (Only Admin or manager)
  - Get list of users  `GET /api/users`(Only Admin or manager)
  - Update specific User `PUT /api/users/:id`(Only Admin or manager)
  - Change user password `DELETE /api/users/changePassword/:id`(Only Logged User)
  - Delete specific User  `DELETE /api/users/:id`(Only Admin)
  - Get logged user data  `GET /api/users/getMe` (Only Logged User)
  - Update user password `PUT /api/users/updateMyPassword` (Only Logged User)
  - Update logged user data without [password,role]  `PUT /api/users/updateMe` (Only Logged User)
  - Deactvate logged user `PUT /api/users/deleteMe` (Only Logged User)
  -    --------------
  - Signup `POST /api/auth/signup` (Only User)
  - Login `POST /api/auth/login`(Only User)
  - Forgot password`POST /api/auth/forgotPassword`(Only User)
  - verify Password Reset Code `POST /api/auth/verifyResetCode`(Only User)
  - reset Password `POST /api/auth/resetPassword` (Only User)
  -    --------------
- Tasks
  - Create task `POST  /api/tasks`(Only Logged user)
  - Get all tasks for logged user `GET  /api/tasks`(Only Logged user)
  - Get late tasks `Get /api/tasks/late`(Only Logged user)
  - Get today tasks `GET /api/tasks/today`(Only Logged user)
  - Get completed tasks `GET  /api/tasks/completed`(Only Logged user)
  - Get one task `GET  /api/tasks/:id`(Only Logged user)
  - Update specific task `PUT /api/tasks/:id`(Only Logged user)
  - Update Task Status `PUT /api/tasks/changeStatus/:id`(Only Logged user)
  - Delete specific task `DELETE /api/tasks/:id`(Only Logged user)
  - Delete all tasks of logged user `DELETE /api/tasks`(Only Logged user)
  -    --------------

### Testing

You can write and run tests using a testing framework like Jest.

To run tests:

```bash

npm test
# or
yarn test
```

### Contributing

Contributions are welcome! Please follow these steps:

- 1- Fork the repository.
- 2- Create a new branch (git checkout -b feature/your-feature-name).
- 3- Make your changes.
Commit your changes (git commit -m 'Add some feature').
- 4- Push to the branch (git push origin feature/your-feature-name).
- 5- Create a Pull Request.
