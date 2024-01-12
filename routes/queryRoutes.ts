import express from 'express';

import { getAll, createUser } from '../controllers/queryController';

const app = express();
app.use(express.json());

const queryRouter = express.Router();

queryRouter.route('/getall').get(getAll);
queryRouter.route('/createuser').post(createUser);






// function handleFormSubmit(event: any, firstName: any, lastName: any, email: any, password:any) {
//     event.preventDefault(); // Prevent default form submission
  
    
  
//     // Thorough validation of user input (essential for security and data integrity)
//     if (isValidData(firstName, lastName, email, password)) {
//        // All fields are valid, proceed to create user
//        console.log('valid data');
//        createUser(firstName, lastName, email, password);
//     } else {
//        // Handle invalid input (e.g., display error messages, highlight invalid fields)
//          console.log('not valid data');
//     }
//   }

//     // Thorough validation of user input (essential for security and data integrity)
//     function isValidData(firstName: string, lastName: string, email: string, password: string) {
//         const errorMessages = [];
      
//         // Required fields check
//         if (!firstName || !lastName || !email || !password) {
//           errorMessages.push("Please fill out all required fields.");
//         }
      
//         // Name validation
//         if (!/^[a-zA-Z ]+$/.test(firstName)) {
//           errorMessages.push("First name must contain only letters and spaces.");
//         }
//         if (!/^[a-zA-Z ]+$/.test(lastName)) {
//           errorMessages.push("Last name must contain only letters and spaces.");
//         }
      
//         // Email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//           errorMessages.push("Please enter a valid email address.");
//         }
      
//         // Password validation
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
//         if (!passwordRegex.test(password)) {
//           errorMessages.push(
//             "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit."
//           );
//         }
//         console.log(errorMessages);
//         return errorMessages.length === 0; // True if all fields are valid
//       }


// handleFormSubmit(loginbtn, firstName, lastName, email, password);

export default queryRouter;

