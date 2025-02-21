module.exports = (sequelize, DataTypes) => {
    const HSNCode = sequelize.define(
      "HSNCode",
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        code: {
          type: DataTypes.STRING(191),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
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
        tableName: "hsn_codes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  
    return HSNCode;
  };