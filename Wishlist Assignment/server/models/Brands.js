module.exports = (sequelize, DataTypes) => {
    const Brands = sequelize.define(
      "Brands",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(191),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "brands",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  
    return Brands;
  };