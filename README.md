# SYNOPSIS
It has basic Authentication system based on JWT.

# Get Started
## Installation
  For installing all packages use:
  `npm install` <br />
## Running the development server
   Notes: Please ensure that backend server is running <br />
   #### Android
  `react-native run-android`
  #### iOS
  `react-native run-ios`
## Running the tests
  `npm run test`
# REST API
Base URL: set it in the "config/dev" folder
### Register
  * URL<br />
    `/auth/register`<br />
    
  * Method: <br />
      POST <br />
      
  * Data Params <br />
      {
          "name":"arpit",
          "email": "arpit@gmail.com",
          "password": "1234567"
      }<br />
### Login
  * URL<br />
    `/auth/login`<br />
    
  * Method <br />
      POST <br />
      
  * Data Params <br />
      {
          "email": "arpit@gmail.com",
          "password": "1234567"
      }<br />
