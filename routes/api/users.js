const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User.Model');
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('username', 'Username is required').not().isEmpty(),
		check('password', 'Password is required').not().isEmpty(),
		check('role', 'Role is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, username, role, password } = req.body;

		try {
			let user = await User.findOne({ username });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exist with this username' }] });
			}

			user = new User({
				name,
				username,
				role,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					return res.cookie('token', token, {
						expires: 360000,
						secure: false,
						httpOnly: true,
					});
				}
			);
		} catch (err) {
			console.error(err);
		}
	}
);

module.exports = router;
