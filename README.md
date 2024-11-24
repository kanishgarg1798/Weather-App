Weather Task 🌦️

This project is a weather application that provides weather forecasts based on user input. It is built using:

Backend: Ruby on Rails for the API
Frontend: React for the user interface

This guide will walk you through the setup process to get the project running locally.

Prerequisites

Ruby: v3.0+
Rails: v7+
Node.js: v16+
Yarn: v1.22+
PostgreSQL: v13+

Setup Instructions

1. Clone the Repository

git clone
cd weather_task

2. Backend Setup (Ruby on Rails API)

(a) Navigate to the weather_app directory:
    cd weather_app

(b) Install Ruby dependencies:
    bundle install

(c) Set up the database:
    rails db:create db:migrate

(d) Create a .env file in the weather_app directory to store your API key:
    touch .env

(e) Start the Rails server:
    rails server

3. Frontend Setup (React)

(a) Navigate to the weather-frontend directory:
    cd ../weather-frontend

(b) Install Node.js dependencies:
    npm install

(c) Start the React development server:
    PORT=3001 npm start

4. Environment Variables

Backend (weather_app/.env):

WEATHER_API_KEY=your_weather_api_key_here

Project Notes:-

The backend uses Rails for handling API requests and fetching weather data using the provided API key.

The frontend uses React to create a user-friendly interface for ssearching and displaying weather data.

Contact:-

If you have any issues or questions, feel free to contact me at kanishgarg17@gmail.com