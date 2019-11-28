import Sequelize, { Model } from 'sequelize';

class Book extends Model {
	static init(sequelize){
		super.init(
			{
				isbn: Sequelize.STRING,
				title: Sequelize.STRING,
				category: Sequelize.STRING,
				year: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);

		return this;
	}

	static associate(models){
		this.belongsTo(models.User, { foreignKey: 'isbn', as: 'sers' });
	}

}

export default Book;