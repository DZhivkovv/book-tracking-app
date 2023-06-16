import Book from '../models/book.model.js';

// Adds a book to the database
export const addBook = async (request, response) => {
  // Extracts the necessary fields from the request body
  const { title, author, pages, status,userData } = request.body;
  const{userID, username} = userData;

  try {
    // Checks if any field from the request is missing
    if (!title || !author || !pages || !status) {
        return response.status(400).json({status:400, error: 'Missing required fields' });
    }
    // Creates a new book instance
    const book = new Book({
      title,
      author,
      pages,
      status,
      postedBy: userID,
      username
    });

    // Saves the book to the database
    await book.save();

    // Sends a success response
    response.send({
      status: 200,
      message: "Book added successfully",
    });
  } catch (error) {

    if (error.name === 'ValidationError') {
      // Handles validation errors
      return response.status(400).json({status:400, error: error.message });
    }

    response.status(500).json({status:500, error: 'Internal server error' });
  }
};

//Gets all the books added by a user from the database using his ID.
export const getUserBooks = async (request, response) => {
  try{
    const id = request.params.userID; //Extracts the userID from the request parameters.
    const userBooks = await Book.find({ postedBy: id }); //Query to the database using the extracted id.
  
    response.send({
      status: 200,
      userBooks,
    });
    
  } catch (error) {
    // Handle any errors that occur during execution
    response.status(500).json({ error: 'Internal server error' });
  }
}