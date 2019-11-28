import * as Yup from 'yup';

import User from '../models/User';

import Book from '../models/Book';
import BooksFavorite from '../models/BooksFavorite';

class UserController {

	async index(req, res) {
		const users = await User.findAll({
			attributes: ['id', 'name', 'email', 'age', 'dateNasc', 'phone'],
		});
		return res.json(users);
	}

	async show(req, res) {
		const user = await User.findOne({
			where: { id: req.params.id },
			attributes: ['id', 'name', 'email', 'age', 'dateNasc', 'phone'],
		});

		return res.json(user);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			dateNasc: Yup.date().required(),
			phone: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
		});

		if(!(await schema.isValid(req.body))){
			return res.status(400).json({ error: 'Validation fails' });
		}

		const userExists = await User.findOne({where : { email: req.body.email }});

		if(userExists){
			return res.status(400).json({ error: 'User already exists. ' });
		}

		const { id, name, age, phone, email, dateNasc } = await User.create(req.body);

		return res.json({
			id,
			name,
			age,
			phone,
			email,
			dateNasc,
		});
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			dateNasc: Yup.date(),
			phone: Yup.string(),
			oldPassword: Yup.string().min(6),
			password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
				oldPassword ? field.required() : field
			),
			confirmPassword: Yup.string().when('password', (password, field) => 
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
		});

		if(!(await schema.isValid(req.body))){
			return res.status(400).json({ error: 'Validation fails' });
		}
		const { email, oldPassword } = req.body;

		const user = await User.findByPk(req.userId);

		if(email !== user.email){
			const userExists = await User.findOne({where : { email: req.body.email }});

			if(userExists){
				return res.status(400).json({ error: 'User already exists. ' });
			} 
		}

		if(oldPassword && ! (await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

		const { id, name, age, dateNasc, phone } = await user.update(req.body);

		return res.json({
			id,
			name,
			email,
			age,
			dateNasc,
			phone,
		});
	}

	async delete(req, res) {
		const users = await User.destroy({
			where: { id: req.params.id },
		});
		return res.json({ message: 'User deleted with success.' });
	}
}

export default new UserController();