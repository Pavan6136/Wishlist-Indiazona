# Wishlist-Indiazona

## 📌 Project Setup Guide

Follow these steps to set up and run the Wishlist-Indiazona project.

### **Step 1: Install Dependencies**
Run the following command to install all necessary packages:
```sh
npm install
```
_or_
```sh
npm i
```

### **Step 2: Connect to Sequelize ORM**
Update your database configuration with:
- **Hostname**
- **Password**
- **Database Name**

### **Step 3: Seed the Database** *(If there is no data)*
Run the following command to seed the database:
```sh
node seed.js
```
_This script is available in the `server` directory._

### **Step 4: Start the Server**
Navigate to the `server` directory and run:
```sh
cd server
node server.js
```

### **Step 5: Start the Frontend**
Navigate to the `client` directory, install dependencies, and start the frontend:
```sh
cd client
npm install
npm start
```
_This will start both the frontend and backend._

### **Navigating to Wishlist Page**
- Click on the **Wishlist** link in the UI
- Or, visit the URL directly:  
  ```sh
  frontend-url/wishlist
  ```




