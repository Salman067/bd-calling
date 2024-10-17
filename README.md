# Train Service Management System

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Setup](#setup)
   - [Local Setup](#local-setup)
   - [Docker Setup](#docker-setup)
5. [API Endpoints](#api-endpoints)
   - [User Management](#user-management)
   - [Station Management](#station-management)
   - [Train Management](#train-management)
   - [Wallet](#wallet)
   - [Ticketing](#ticketing)
   - [Train Schedule](#train-schedule)
6. [Scheduled Tasks](#scheduled-tasks)
7. [Authentication](#authentication)
8. [Error Handling](#error-handling)

## Overview

This project is a backend system for managing train services, including user management, station information, train schedules, wallet integration, and ticketing. It's built using Node.js, Express, and MongoDB, with additional features like JWT authentication and scheduling.

## Features

- User Management (registration, login, authentication)
- Station Management
- Train Management and Scheduling
- Wallet Integration
- Ticketing System
- Automated Scheduling Tasks:
  - Regular train status updates
  - Trip reminders for passengers
  - Daily report generation
  - Periodic train schedule fetching

## Prerequisites

- Node.js 
- MongoDB
- npm 

## Setup

### Local Setup

1. Clone the repository:
   ```
   git clone git@github.com:Salman067/bd-calling.git
   cd bd-calling
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   DATABASE_URL=mongodb+srv://bdcalling:bdcalling@cluster0.kjogk.mongodb.net/
   PORT=8000
   JWT_ACCESS_SECRET='simplerSecretKey123'
   JWT_EXPIRES_IN='1h'
   ```

4. Start the MongoDB server.

5. Run the application:
   ```
   npm start
   ```

### Docker Setup

Run the application with Docker:
```
docker compose up --build
```
or
```
docker-compose up --build
```

## API Endpoints

### User Management

- POST /api/v1/users/register - Register a new user
- POST /api/v1/users/login - User login

### Station Management

- GET /api/v1/stations/ - Get all stations (Admin & User)
- POST /api/v1/stations/create - Create a new station (Admin Only)
- GET /api/v1/stations/:id - Get a specific station (Admin & User)
- PATCH /api/v1/stations/update/:id - Update a station (Admin Only)
- DELETE /api/v1/stations/delete/:id - Delete a station (Admin Only)

### Train Management

- GET /api/v1/trains/ - Get all trains (Admin & User)
- POST api/v1/trains/create - Create a new train (Admin Only)
- GET /api/v1/trains/:id - Get a specific train (Admin & User)
- PATCH /api/v1/trains/update/:id - Update a train (Admin Only)
- DELETE /api/v1/trains/delete/:id - Delete a train (Admin Only)

### Wallet

- GET /api/v1/wallets - Get user's wallet balance (Admin & User)
- POST /api/v1/wallets/add-funds - Add funds to wallet (Admin Only)

### Ticketing

- POST /api/v1/tickets/calculate-price - Calculate price for tickets (Admin & User)
- POST /api/v1/tickets/purchase - Purchase a ticket (Admin & User)
- DELETE /api/v1/tickets/:id - Delete a ticket (Admin Only)
- GET /api/v1/tickets/trains-between-stations?fromStation=?&toStation=? - Get a list of stations between stations (Admin & User)

### Train Schedule

- POST /api/v1/schedules/create - Create a new schedule (Admin Only)
- PATCH /api/v1/schedules/update/:id - Update a schedule (Admin Only)
- GET /api/v1/schedules/ - Get a list of schedules (Admin & User)
- GET /api/v1/schedules/:id - Get a view of schedules (Admin & User)

## Scheduled Tasks

The system includes several automated tasks scheduled using node-cron:

- Update Train Statuses: Runs every 5 minutes to update the current status of all trains.
- Send Trip Reminders: Runs daily at 8:00 AM to send reminders for upcoming trips.
- Generate Daily Reports: Runs daily at 12:01 AM to generate reports on tickets sold and revenue.
- Fetch Train Schedules: Runs every 5 minutes to fetch and update all train schedules.

## Authentication

This API uses JWT for authentication. Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API uses standard HTTP status codes for error responses. Check the response body for detailed error messages.