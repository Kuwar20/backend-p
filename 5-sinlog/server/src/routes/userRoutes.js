import express, { response } from 'express';
import authenticateToken from '../middleware/auth.js';
import { deleteUser, loginUser, registerUser } from '../controllers/userCtrl.js';

const router = express.Router();

/* 
http://localhost:3000/api/user/register
body = {"name":"test1","email":"email1@gmail.com","password":"password1"}
response/output = {"message": "User registered successfully"} 

// and if somebody try to register with same email again then it will give error
{"error": "User with this email already exists"}

*/

router.post('/register', registerUser);

/* 
http://localhost:3000/api/user/login
body = {"email":"email1@gmail.com","password":"password1"}
response/output = {"message": "User logged in successfully","token" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE3MDc1NzgwMDAsImV4cCI6MTcwNzU4MTYwMH0.qmnPkbBS-JWlA5goU6Rnc7IkJD140YnsHL85DdgtxrY"}

// and if somebody try to login with wrong email or password then it will give error 
{"error": "Invalid email or password"}

*/

router.post('/login', loginUser);

/* 
http://localhost:3000/api/user/delete

body = {"email": "email1@gmail.com"}
response/output = 
{
    "message": "User deleted successfully",
    "user": {
        "_id": "65c7918dbb9ef834d2cedd36",
        "name": "test1",
        "email": "email1@gmail.com",
        "password": "$2a$10$ofbFBi8cW/uWcGYVyQ/RcewSxF1GnbgogT3Fz/rKD3lazCsmYyx3i",
        "createdAt": "2024-02-10T15:09:01.999Z",
        "__v": 0
    }
}

//to ensure that only the user with the same email can delete only their account

we send Authorization in header with token,
this token is generated when user login with and it is valid for 1 hour 
now we can use that token to ensure that user only delete their account

ex - Key: Authorization , Value: Bearer <JWT Token>
live ex - Key: Authorization, Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMkBnbWFpbC5jb20iLCJpYXQiOjE3MDc1Nzc2MDAsImV4cCI6MTcwNzU4MTIwMH0.ZYNU6Ksx96dMGOv2koocnuiiRLaLFC5QyrQ4jAHpEvo

// and if somebody try to delete user with wrong email or delete the deleted user then it will give error
{"error": "Unauthorized access"} 

*/

router.delete('/delete', authenticateToken, deleteUser);

export default router;