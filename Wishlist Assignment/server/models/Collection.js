module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define(
      "Collection",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        wishlist_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "wishlists",
            key: "id",
          },
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
        tableName: "collections",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    
  
    return Collection;
  };