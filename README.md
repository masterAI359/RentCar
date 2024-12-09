
# Rent a Ride

This repository contains the code for a Full stack car rental website with 3 modules User,Admin,Vendor . The project is divided into Client  and  backend 


## Installation

Clone Rent a Ride

```bash
https://github.com/jeevan-aj/Rent-a-Ride.git
```

Install node modules

```bash
  cd backend
  npm install
  npm run dev
```
```bash
  cd client
  npm install
  npm run dev
```

    
## Tech Stack

**Client:** React, Javascript, Redux Toolkit, Material Ui, TailwindCSS, React Toast 

**Server:** Express.js, Mongodb, Cloudinary, Nodemailer , Multer

**Deployed frontend and backend  On AWS ec2, Nginx as Reverse Proxy ,Cloudflare as Dns resolver ,Used Pm2 for uptime**


## Demo

Insert gif or link to demo


## Project Description

A full-scale Car Rental Platform with user, admin, and vendor modules, designed to offer seamless vehicle booking, management, and administration. The platform is developed using modern technologies to ensure smooth and efficient operations, catering to different user roles with distinct functionalities.

Key Features & Modules:
User Module:

View and Book Vehicles: Users can view available vehicles and book them online.
Profile Management: Users can view and edit their profiles, as well as manage their account settings.
Order Management: View past and upcoming orders; users can only access their own bookings.
Account Management: Users can sign up, sign in, delete their account, and sign out seamlessly.
Email Notifications: After booking a vehicle, users receive an email with order details.
Admin Module:

Booking Management: Admins can view and manage bookings, including booking details and statuses.
Vendor Management: View and approve/reject vendors, as well as remove vendors from the platform.
Vehicle Management: Admins can view, update, and delete vehicle listings.
User Management: Admins have the ability to remove users from the platform.
Vendor Module:

Sign Up and Sign In: Separate sign-up and sign-in flow for vendors.
Vehicle Listing: Vendors can add their vehicles to the platform for approval by the admin. Approved vehicles will be listed on the site.
Order Notifications: Vendors receive updates on orders when users book their vehicles.
Technology Stack:
Frontend: React.js (with Vite), Redux Toolkit, Tailwind CSS, React Hook Form, Zod for form validation, Google OAuth, Razorpay for payment processing.
Backend: Node.js, Express.js, MongoDB, Multer for handling multipart form data, Nodemailer for sending emails, Cloudinary for media storage, MVC architecture, JWT with access and refresh tokens, Protected routes, Role-based access control.
Database: MongoDB with aggregation pipelines, referencing models, and optimized storage solutions.
Deployment: Deployed on AWS EC2, utilizing Nginx as a reverse proxy, and Cloudflare for DNS management.
Features & Implementations:
JWT Authentication: Integrated JWT access and refresh tokens to secure user, admin, and vendor login flows.
Role-Based Access: Implemented protected routes and role-based access to restrict access based on user roles (Admin, User, Vendor).
Dynamic Location Selector: The location picker dynamically updates pickup and drop-off options based on user location selection.
Search, Sort, Filter Functionality: Enhanced search, filter, and sort capabilities for seamless vehicle browsing and booking.
UI Development: Built most of the UI from scratch, including dynamic form validations using Zod and React Hook Form.
Google OAuth: Integrated Google OAuth for quick and secure sign-up/sign-in functionality.
Email Notifications: Implemented automated email notifications for vehicle booking confirmations using Nodemailer.
Cloudinary Integration: Used Cloudinary to handle image and video storage, reducing the database load by optimizing media assets.
MongoDB: Used four main models to take advantage of MongoDB’s referencing functionality, improving data organization and retrieval efficiency.
Multer: Utilized Multer to handle file uploads for vehicles, including images and videos.
Version Control: Employed Git throughout the project for version control, collaboration, and backup.
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

