import User from '../models/user';
import sharp from 'sharp';

export const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token});
    } catch (e) {
        res.status(400).send(e);
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {       
            res.status(400).send();
    }
}

export const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token );
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
}

export const logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
}

export const getUser = async (req, res) => {
    res.send(req.user);
}

export const editUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        const user = req.user;
        if(!user){
            return res.status(404).send();
        }
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
}

export const uploadAvatar = async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}

export const removeAvatar = async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
}

export const getAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
}