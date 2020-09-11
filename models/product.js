// Table definition: product
module.exports = function (sequelize, DataTypes) {
  var Product = sequelize.define("Product",{
   
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      product_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      product_desc: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      product_image: {
        type: DataTypes.STRING(50),
        //   allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  // Export table object
  return Product;
};
