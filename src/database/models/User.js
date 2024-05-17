import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        age: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        country: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        mobile: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
  
  }

  validPassword = async function (email) {
    return await email === this.email;
  };
}

export default User;
