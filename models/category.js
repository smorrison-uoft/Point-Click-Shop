// Table definition: category
module.exports = function (sequelize, DataTypes) {
  var category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
  return category;
};
