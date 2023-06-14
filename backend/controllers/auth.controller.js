import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

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
                console.error(error)
            }
        }
    }
}
