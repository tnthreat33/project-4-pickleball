# Pickle Ball Court Reservation App

This is a web application that allows users to reserve pickle ball courts and add their own courts for others to use. The frontend of the application is built using React, while the backend is developed with Ruby on Rails. The application utilizes a RESTful API to handle user authentication, court management, and reservation functionality.

Demo: https://youtu.be/5eWtgUiP_Cw

## Features

- User authentication: Users can create accounts, log in, and log out of the application.
- Court management: Users can view a list of available courts and create new courts.
- Reservation management: Users can view their reservations, create new reservations, delete their reservations and update existing reservations.
- User profile: Users can view their profile information, including their reservations.

## Technologies Used

- Frontend: React
- Backend: Ruby on Rails
- Database: PostgreSQL

## Backend Models

The backend consists of the following models:

- **User**: Represents a user of the application. Users can have many reservations and courts.
- **Court**: Represents a pickle ball court. Courts can have many reservations and many users.
- **Reservation**: Represents a reservation made by a user for a specific court. Reservations belong to both users and courts.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository: `git clone project-4-pickleball`
2. Navigate to the project directory: `cd project-4-pickleball`
3. Install dependencies: `npm install`
4. Start the development server: `rails s'
5. Start the client : 'npm start`
6. Access the application in your browser at `http://localhost:3000`

## Frontend Structure

 Here's an overview of the frontend components used:

- **App**: The main component that handles the overall structure and routing of the application. It fetches data from the backend API and manages state related to courts, users, and reservations.
- **NavBar**: Displays the navigation bar that links to different pages and the user's profile.
- **Home**: Displays the home page, showing a list of available courts.
- **Courts**: Displays the list of all courts and allows users to create new courts.
- **Reservations**: Displays the user's reservations, all reservations and allows them to manage their reservations.
- **NewReservationForm**: Allows users to create a new reservation.
- **Login**: Handles user authentication, allowing users to log in to the application.
- **NewCourtForm**: Allows users to create a new court..
- **UserProfile**: Displays the user's profile information, including their reservations.
- **UpdateReservationForm**: Allows users to update an existing reservation, including changing the court or time slot.

## API Endpoints

The frontend interacts with the backend API through various endpoints. Here are some of the important API endpoints used by the application:

- `GET /auth`: Retrieves the current user's information for auto-login.
- `GET /courts`: Retrieves the list of courts.
- `POST /courts`: Creates a new court.
- `GET /reservations`: Retrieves the user's reservations.
- `POST /reservations`: Creates a new reservation.
- `PATCH /reservations/:reservationId`: Updates an existing reservation.
- `DELETE /logout`: Logs out the current user.


