import express from 'express'
import { addBook, getUserBooks } from "../controllers/book.controller.js";

const router = express.Router();

router.post('/addBook', addBook)
router.get('/getUserBooks/:userID', getUserBooks)

export default router