# QuotesWebapp

This is a webapp that allows users to browse, create, and save quotes.
You can visit the webapp using this link: https://quotescollectionwebapp.herokuapp.com/

This project was built based on the MERN stack.

<br/>

## Technologies

<br/>

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### DevOps

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

<br/>

## Features

### CRUD
- Quote Create, Read
- Quote collections CRUD
- Like/Dislike Quote
- Add/Remove quote to/from a collection

### Authentication
- Hash using bcrypt
- Sign JWT Token
- Schema Validation -> Highlight particular input field & display message on error (login & signup screen)
- Auto login/logout

### DevOps
- Store user uploaded images with AWS S3
- Resize images using AWS Lambda function (triggered by AWS S3 event) & save to another S3 bucket

### Design
- SCSS to handle global styles such as color, typography, & breakpoints
- Grid layout to accomodate different viewport size
- Use of modals to minimize interruption & reloading when browsing

### Other
- Give suggestions (based on Google's books api) when creating quote
- Highlight essential part of quote using <> brackets when typing quote text
- Display placeholders on load
- Infinite scrolling