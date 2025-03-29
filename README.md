# Nodepop

Nodepop is a simple web application built with Node.js, Express, and MongoDB, designed for selling second-hand items. This project was developed as part of the introductory backend development with Node.js module at the Keepcoding Web Development Bootcamp.

## Features

- **Product Management:**
  - Create new products with name, owner, price, and picture.
  - Delete existing products.
- **User Management:**
  - Users have profiles with name, email, and password.
  - Each product is associated with an owner (user).
- **MongoDB Integration:**
  - Data persistence using MongoDB.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd nodepop
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Running the Application

- **Development Mode:**

  ```bash
  npm run dev
  ```

  This command starts the server using `nodemon` for automatic restarts on file changes, making development easier.

- **Initializing the Database:**

  ```bash
  npm run initDB
  ```

  This command will:

  - Delete all existing records in the MongoDB database.
  - Create initial sample data for products and users.
  - **Use this command only when you want to reset your database.**

### Dependencies

- **Express:** Web framework for Node.js.
- **MongoDB:** Database for data persistence.
- **Mongoose:** MongoDB object modeling tool.
- **Nodemon:** For automatic server restarts during development.

Note: dotenv was added to handle private info, be sure to create a file .env and add the necesary changes to make it work. You can contact me on more information.
