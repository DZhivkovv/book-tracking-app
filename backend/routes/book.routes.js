import express from 'express'
import { addBook, getUserBooks, removeBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post('/addBook', addBook)
router.post('/removeBook', removeBook)
router.get('/getUserBooks/:userID', getUserBooks)


export default router