import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (request, response) => {
    const { email, username, password } = request.body;
    // Check if the email or username is already taken
    const takenEmail = await User.findOne({ "email": email });
    const takenUsername = await User.findOne({ "username": username });

    if (takenEmail) {
        // If email is already taken, send a 409 (Conflict) response
        response.status(409).json({
            status: 409,
            message: "Email address has already been taken"
        });
    } else if (takenUsername) {
        // If username is already taken, send a 409 (Conflict) response
        response.status(409).json({
            status: 409,
            message: "Username has already been taken"
        });
    } else {
        try {
            // Encrypt the password before saving it in the database
            const encryptedPassword = await bcrypt.hash(password, 10);
            
            // Create a new user
            const user = new User({
                email,
                username,
                password: encryptedPassword
            });

            // Save the user to the database
            await user.save();

            // Send a 200 (OK) response with a success message
            return response.status(200).json({ message: "User created successfully!" });
        } catch (error) {
            // Handle different types of errors
            if (error.name === "ValidationError") {
                // If there's a validation error, send a 400 (Bad Request) response
                response.status(400).json({ error: "Validation error: " + error.message });
            } else if (error.name === "MongoError") {
                // If there's a MongoDB error, send a 500 (Internal Server Error) response
                response.status(500).json({ error: "Database error: " + error.message });
            } else {
                // For any other errors, send a 500 (Internal Server Error) response
                response.status(500).json({ error: "Internal server error" });
            }
        }
    }
}

export const login = async (request, response) => {
    const { email, password } = request.body;

    await User.findOne({ email: email })
        .then(async (dbUser) => {
            if (!dbUser) {
                // Returns error response if user is not found in the database 
                return response.json({
                    status: 400,
                    message: "Invalid username or password"
                });
            }
    
            // Compares the provided password with the hashed password stored in the database
            const isCorrect = await bcrypt.compare(password, dbUser.password);
    
            if (isCorrect) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username
                };
    
                try {
                    const token = await new Promise((resolve, reject) => {
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn: 86400},
                            (error, token) => {
                                if(error) reject(error);
                                resolve(token);
                            }
                        )
                    })
    
                    return response.json({
                        status:200,
                        isLoggedIn: true,
                        message: "Success",
                        token:token
                    })
                } catch (error) {
                    if (error.name === "TokenExpiredError") {
                        // Handles the case when the token has expired
                        return response.status(401).json({ message: "Token has expired" });
                    } else {
                        // Handles other errors related to token generation
                        return response.status(400).json({ message: error.message });
                    }
                }
            } else {
                // Returns error response if the provided password is incorrect
                return response.status(400).json({
                    status: 400,
                    message: "Invalid username or password"
                });
            }
        });
    }

    export const isUserLoggedIn = async (request, response) => {
        try {
          // Gets the token from the request header
          const token = request.headers['x-access-token'];
          const tokenValue = token === 'null' ? null : token;
      
          if (!tokenValue) {
            // Returns error response if the token is not found
            return response.status(404).json({
              status: 404,
              isLoggedIn: false,
              message: 'Token not found',
            });
          } else {
            // Verifies the token and extracts username and userID from the decoded token
            const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
            const username = decodedToken.username;
            const userID = decodedToken.id;
      
            // Returns success response with user details and isLoggedIn flag
            return response.status(200).json({
              status: 200,
              username,
              userID,
              isLoggedIn: true,
            });
          }
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            // Handles TokenExpiredError
            return response.status(401).json({ message: 'Token has expired' });
          } else {
            // Handles other token verification errors
            return response.status(400).json({ message: 'Invalid token' });
          }
        }
      };