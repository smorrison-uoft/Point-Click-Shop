module.exports = function(sequelize, DataTypes) {
  var category = sequelize.define("category", {
    
    name: DataTypes.STRING
  });

  category.associate = function(models) {
   
    category.hasMany(models.Product, {
      onDelete: "cascade"
    });
  };

  return category;
};

