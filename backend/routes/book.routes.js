import express from 'express'
import { addBook } from "../controllers/book.controller.js";

const router = express.Router();
router.post('/addBook', addBook)

export default router