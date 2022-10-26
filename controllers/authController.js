const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()
const { addUser, getUserByEmail, getUserById, updateUser, getUser } = require('../services/authService');
const geocoder = require("../utils/geoCoder");

module.exports.register = async (req, res, next) => {
    try {
        const user = req.body
        const isEmailExist = await getUserByEmail(user.email);
        if (isEmailExist) {
            throw new Error(`Email already exists. Use a different email to complete your registration.`);
        }
        const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        user.password = hashedPassword;
        await addUser(user)
        const { password, ...otherDetails } = user;
        res.status(201).json({
            message: 'User added successfully',
            user: otherDetails
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                const token = jsonwebtoken.sign({
                    _id: user._id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role
                }, process.env.JWT_TOKEN_KEY);
                res.status(200).json({ success: true, token })
            } else {
                res.status(400).json({ message: 'Wrong password' })
            }
        } else {
            res.status(404).json({ message: `User doesn't exist` });
        }
    } catch (e) {
        next(e)
    }
}

module.exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `User doesn't exist` });
        }
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const loc = await geocoder.geocode(data.address);
        data.location = [loc[0].latitude, loc[0].longitude];
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, await bcrypt.genSalt(10));
            data.password = hashedPassword;
        }
        const user = await updateUser(id, data);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(500).json({ message: `User information cannot be updated` });
        }
    } catch (error) {
        next(error)
    }
}