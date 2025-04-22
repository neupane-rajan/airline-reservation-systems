# Airline Reservation System

A complete airline reservation system built primarily with Python, allowing users to search flights, make bookings, manage reservations, and more.

## 📋 Table of Contents
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation Guide for Windows](#installation-guide-for-windows)
- [Running the Application](#running-the-application)
- [How to Use](#how-to-use)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- Flight search and booking
- User registration and authentication
- Passenger information management
- Booking history and e-tickets
- Admin panel for flight management
- Responsive design for all devices

## 🖥️ System Requirements

- Windows 10 or newer
- Python 3.8 or higher
- Internet connection for database access (if applicable)
- 4GB RAM minimum (8GB recommended)
- 1GB free disk space

## 🚀 Installation Guide for Windows

### Step 1: Install Python

1. Download Python 3.8 or higher from the [official Python website](https://www.python.org/downloads/windows/)
2. Run the installer
3. **IMPORTANT:** Check the box that says "Add Python to PATH" during installation
4. Click "Install Now"

### Step 2: Install Git (for cloning the repository)

1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer with default settings

### Step 3: Clone the Repository

1. Open Command Prompt (Press Windows + R, type "cmd" and press Enter)
2. Navigate to the directory where you want to install the project:
   ```
   cd C:\Users\YourUsername\Documents
   ```
3. Clone the repository:
   ```
   git clone https://github.com/neupane-rajan/airline-reservation-systems.git
   ```
4. Navigate into the project folder:
   ```
   cd airline-reservation-systems
   ```

### Step 4: Set Up Virtual Environment

1. Create a virtual environment:
   ```
   python -m venv venv
   ```
2. Activate the virtual environment:
   ```
   venv\Scripts\activate
   ```
   (You should see `(venv)` at the beginning of the command prompt line)

### Step 5: Install Dependencies

With the virtual environment activated, install required packages:
```
pip install -r requirements.txt
```

### Step 6: Set Up the Database

1. Run database migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
2. Create an admin user:
   ```
   python manage.py createsuperuser
   ```
   Follow the prompts to create a username, email, and password

## 🏃‍♂️ Running the Application

1. Ensure your virtual environment is activated (`venv\Scripts\activate`)
2. Start the development server:
   ```
   python manage.py runserver
   ```
3. Open your web browser and go to: `http://127.0.0.1:8000/`
4. To access the admin panel, go to: `http://127.0.0.1:8000/admin` and login with the superuser credentials

## 🧭 How to Use

### For Regular Users:
1. **Register/Login**: Create an account or login with existing credentials
2. **Search Flights**: Enter departure/arrival locations, dates, and passenger count
3. **Book Tickets**: Select a flight and fill in passenger details
4. **View Bookings**: Access your booking history and e-tickets
5. **Manage Profile**: Update your personal information

### For Admin Users:
1. Login to the admin panel at `http://127.0.0.1:8000/admin`
2. Manage flights, users, bookings, and other system data

## 📸 Screenshots
(Add screenshots of your application here to help users visualize the interface)

## ❓ Troubleshooting

### Common Issues:

1. **"Python is not recognized as an internal or external command"**
   - Solution: Reinstall Python and make sure to check "Add Python to PATH" during installation

2. **"Could not find a version that satisfies the requirement..."**
   - Solution: Make sure you're connected to the internet and try:
     ```
     pip install --upgrade pip
     pip install -r requirements.txt
     ```

3. **Database migration errors**
   - Solution: Try deleting the migration files (except __init__.py) in each app's migrations folder, then run:
     ```
     python manage.py makemigrations
     python manage.py migrate
     ```

4. **Port already in use**
   - Solution: Change the port number:
     ```
     python manage.py runserver 8080
     ```
   Then access the site at `http://127.0.0.1:8080/`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
