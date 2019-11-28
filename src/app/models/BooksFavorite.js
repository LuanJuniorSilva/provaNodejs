import Sequelize, { Model } from 'sequelize';

class BooksFavorite extends Model {
	static init(sequelize){
		super.init(
			{
				user_id: Sequelize.NUMBER,
				isbn_id: Sequelize.STRING,
				date: Sequelize.DATE,
			},
			{
				sequelize,
			}
		);

		return this;
	}

}

export default BooksFavorite;