# বাজার দর (Bazar Dor)

**Know today's essential product prices at a glance.**

Bazar Dor is a Bangla-language web application that helps users explore essential product prices, compare market prices, and understand daily price changes in Bangladesh.

## Live Website

🔗 [Visit Bazar Dor](https://bazar-dortoday.netlify.app/)

## Features

* Browse essential products and their current prices.
* Explore products by category.
* View product details and daily price changes.
* Compare market-wise prices where data is available.
* View minimum, maximum, and average market prices.
* User authentication with email and password.
* Responsive interface for desktop, tablet, and mobile devices.
* Bangla-language user interface.

## Technologies Used

* Next.js
* React
* JavaScript
* Tailwind CSS
* Better Auth
* MongoDB
* REST API
* Netlify

## Installation and Setup

### Prerequisites

* Node.js
* npm
* MongoDB connection string

### 1. Clone the Repository


git clone https://github.com/jahidul-taalha/Bazar.com.git


### 2. Navigate to the Project Directory

cd Bazar.com


### 3. Install Dependencies


npm install


### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:


BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection_string


Replace the placeholder values with your actual configuration. Keep `.env.local` private and never commit your credentials to GitHub.

### 5. Run the Development Server


npm run dev


Open http://localhost:3000 in your browser.

### 6. Build for Production

npm run build

## API
The application retrieves product information from the Bazar Dor API.
**Base URL:**
https://api.api-store.workers.dev/api/bazardor

Available endpoints include:

* `GET /products` — Retrieve products.
* `GET /products?category=chal` — Retrieve products by category.
* `GET /products/1` — Retrieve a product by ID.
* `GET /categories` — Retrieve categories.
* `GET /categories/chal` — Retrieve a category's information.

## Deployment
The application is deployed on Netlify.

🔗 Live URL: https://bazar-dortoday.netlify.app/

## Author
**MD. JAHIDUL ISLAM**

GitHub: [@jahidul-taalha](https://github.com/jahidul-taalha)

Built with ❤️ to make everyday market price information easier to access.
