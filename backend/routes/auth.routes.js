import express from 'express'
import { login, signup, isUserLoggedIn } from "../controllers/auth.controller.js";

const router = express.Router();
router.post('/signup', signup)
router.post('/login', login)
router.get('/isUserLoggedIn', isUserLoggedIn)

export default router