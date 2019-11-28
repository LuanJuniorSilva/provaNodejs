import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
	static init(sequelize){
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL,
				password_hash: Sequelize.STRING,
				dateNasc: Sequelize.DATEONLY,
				age: {
					type: Sequelize.VIRTUAL,
					get() {
						return new Date().getFullYear() - this.dateNasc.split('-')[0];
					}
				},
				phone: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);

		this.addHook('beforeSave', async user => {
			if(user.password) {
				user.password_hash = await bcrypt.hash(user.password, 8);
			}
		});

		return this;
	}

	checkPassword(password){
		return bcrypt.compare(password, this.password_hash);
	}

	static associate(models){
		this.belongsTo(models.BooksFavorite, { foreignKey: 'id', as: 'userId' });
	}
}

export default User;