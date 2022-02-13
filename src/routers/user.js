import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth';

const router = new express.Router();

import { 
    createUser,
    deleteUser, 
    editUser, 
    getAvatar, 
    getUser, 
    loginUser, 
    logoutAll, 
    logoutUser, 
    removeAvatar, 
    uploadAvatar 
} from '../controllers/user.js';

router.post('/users', createUser);

router.post('/users/login', loginUser);

router.post('/users/logout', auth, logoutUser);

router.post('/users/logoutAll', auth, logoutAll);

router.get('/users/me', auth, getUser);

router.patch('/users/me', auth, editUser);

router.delete('/users/me', auth, deleteUser);

const storage = multer.memoryStorage();

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }, 
    storage
});

router.post('/users/me/avatar', auth, upload.single('avatar'), uploadAvatar);

router.delete('/users/me/avatar', auth, removeAvatar);

router.get('/users/:id/avatar', getAvatar);

export default router;