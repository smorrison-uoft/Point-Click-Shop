// Table definition: category
module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      category_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      category_desc: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  // Export table object
  return Category;
};
