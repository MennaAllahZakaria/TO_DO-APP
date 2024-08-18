# TO DO app (Front end side )

This is the front-end part of the To-Do application built with React. The app allows users to manage their tasks by creating, editing, deleting, and marking them as completed. It supports user authentication, dark mode, and responsive design.

## Features
- User authentication (Sign up, Login, Password Reset)
- Task management (Create, Read, Update, Delete)
- Can filter tasks to ( all , late , today and completed) 
- Dark and Light mode toggle
- Responsive design
- Notifications for task actions
- Profile management

## Tech Stack

- React: Front-end library for building user interfaces
- React Router: For routing and navigation
- Bootstrap: For responsive UI design
- Axios: For making HTTP requests to the backend API
- Formik & Yup: For form handling and validation
- React Toastify: For displaying notifications
  
## Installation
- ##### Prerequisites
- Node.js (version 14 or above)
- npm or yarn
  
  
- ##### Clone the Repository

```bash
git https://github.com/MennaAllahZakaria/TO_DO-APP/tree/main/client
cd client
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
VITE_API_URL=YOUR_API_URL
```

Make sure the backend server is running on the specified API URL.

#### Customization
##### Dark Mode
The app includes a dark mode feature. The mode can be toggled via the button in the NavBar. CSS variables are used to handle the theme colors, making it easy to customize.

To customize the colors, modify the :root, body.light, and body.dark CSS variables in App.css.

Notifications
To customize or add more notifications, use the showSuccessToast and showErrorToast utility functions in the toastUtils.js file.


### Contributing

Contributions are welcome! Please follow these steps:

- 1- Fork the repository.
- 2- Create a new branch (git checkout -b feature/your-feature-name).
- 3- Make your changes.
Commit your changes (git commit -m 'Add some feature').
- 4- Push to the branch (git push origin feature/your-feature-name).
- 5- Create a Pull Request.
