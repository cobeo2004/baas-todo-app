# Todo App with Next.js and PocketBase

This is a full-stack todo application built with [Next.js](https://nextjs.org) and [PocketBase](https://pocketbase.io), demonstrating real-time updates, image uploads, and authentication.

## Features

- 🔄 Real-time todo updates using PocketBase's realtime subscriptions
- 🖼️ Image upload functionality for todo attachments
- 🔐 User authentication and authorization
- ⚡ Fast and responsive UI with Next.js
- 🎨 Modern styling with Tailwind CSS

## Getting Started

### Prerequisites

1. Install Node.js and npm

### Setup

1. Clone this repository
   ```
   git clone https://github.com/cobeo2004/baas-todo-app
   cd todo-app-pocketbase
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run both `pocketbase` and `NextJS` app using:
   ```
   npm run dev
   ```

- This will concurrently serve `pocketbase` and `NextJS` in a single command.

4. Copy `.env.example` to be `.env`
5. Navigate to `http://localhost:3000` for the `NextJS` application.
6. For `Pocketbase`, refers to the given links:

   ```
   - Server:  http://127.0.0.1:8090
   - REST API:  http://127.0.0.1:8090/api/
   - Dashboard: http://127.0.0.1:8090/_/
   ```
