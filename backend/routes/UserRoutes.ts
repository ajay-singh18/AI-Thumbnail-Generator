import express from 'express'
import { getThumbnailbyId, getUsersThumbnail } from '../controllers/UserController.js';
import protect from '../middlewares/auth.js';

const UserRouter = express.Router();

UserRouter.get('/thumbnails',protect, getUsersThumbnail)
UserRouter.get('/thumbnail/:id',protect, getThumbnailbyId)

export default UserRouter;