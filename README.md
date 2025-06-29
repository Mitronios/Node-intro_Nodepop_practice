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
- **Multer:** For multipart/formdata handling.
- **i18n:** For internationalization and language management.
- **Swagger:** For API documentation.

Note: dotenv was added to handle private info, to connect MongoDB be sure to create a file .env or add the necesary changes to make it work.
Same for bcrypt secret.
Checkout the .env.example to see more details.

## API docs

A complete documentation was added thanks to Swagger jsdoc and Swagger UI.
You can see the docs by navigating to:

```sh
  /api-docs/
```

# Docker & Docker Compose

### Prerequisites

[Docker](https://docs.docker.com/get-started/get-docker/) installed on your machine

[Docker Compose](https://docs.docker.com/compose/install/) installed (usually comes with Docker Desktop)

## Build and Run with Docker Compose

This project uses Docker Compose to run both the Nodepop app and MongoDB together.

1. Create a .env file in the project root with your environment variables:

```sh
MONGODB_URI=mongodb://root:<your_mongo_password>@mongo:27017/admin?authSource=admin
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret

```

2. Build and start the containers

```sh
docker compose up --build
```

This command will:

- Build the Docker image for the Nodepop app

- Start the Nodepop container and MongoDB container

- Expose the app on http://localhost:3000

3. Stop the containers

To stop the running containers, run:

```sh
docker compose down
```

## Running Nodepop without Docker Compose (Optional)

1. If you want to run the Nodepop app alone with Docker:

Build the image:

```sh
docker build -t nodepop .
```

2. Run the container (make sure MongoDB is accessible from inside the container):

```sh
docker run -p 3000:3000 --env-file .env nodepop
```

## Notes

- The MongoDB data is persisted in a Docker volume called mongo_data, so your data won’t be lost when stopping containers.

- The Nodepop app connects to MongoDB using the hostname mongo inside Docker network.

- Make sure to never commit your .env file to any public repository.

You can contact me on more information.
