import * as Yup from 'yup';
import Sequelize from 'sequelize';

import Book from '../models/Book';
import BooksFavorite from '../models/BooksFavorite';

class BookController {

	async index(req, res) {
		const books = await Book.findAll({
			attributes: ['id', 'isbn', 'title', 'category', 'year'],
		});
		return res.json(books);
	}

	async show(req, res) {
		const book = await Book.findOne({
			where: { id: req.params.id },
			attributes: ['id', 'isbn', 'title', 'category', 'year'],
		});
		return res.json(book);
	}

	async store(req, res) {

		const schema = Yup.object().shape({
			isbn: Yup.string().required(),
			title: Yup.string().required(),
			category: Yup.string().required(),
			year: Yup.string().required(),
		});

		if(!(await schema.isValid(req.body))){
			return res.status(400).json({ error: 'Validation fails' });
		}

		const bookExists = await Book.findOne({where : { isbn: req.body.isbn }});

		if(bookExists){
			return res.status(400).json({ error: 'Book already exists. ' });
		}
	
		const { id, isbn, title, category, year } = await Book.create(req.body);

		return res.json({
			id, 
			isbn,
			title,
			category,
			year,
		});

	}

	async update(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string(),
			category: Yup.string(),
			year: Yup.string(),

		});

		if(!(await schema.isValid(req.body))){
			return res.status(400).json({ error: 'Validation fails' });
		}

		const book = await Book.findByPk(req.params.id);

		if(req.body && req.body.isbn){
			delete req.body.isbn;
		}

		const { isbn, title, category, year } = await book.update(req.body);

		return res.json({
			isbn,
			title,
			category,
			year,
		});
	}

	async delete(req, res) {
		const book = await Book.destroy({
			where: { id: req.params.id },
		});
		return res.json({ message: 'Book deleted with success.' });
	}


	async addFavorite(req, res) {
		const schema = Yup.object().shape({
			isbn_id: Yup.string().required(),
			user_id: Yup.string().required(),
			date: Yup.date().required(),
		});

		if(!(await schema.isValid(req.body))){
			return res.status(400).json({ error: 'Validation fails' });
		}
		
		const { isbn_id, user_id, date } = await BooksFavorite.create(req.body);

		return res.json({
			isbn_id, 
			user_id,
			date,
		});

	}
}

export default new BookController();