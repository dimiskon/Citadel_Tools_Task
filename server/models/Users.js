"use strict";

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      freezeTableName: true,
    }
  );

  Users.associate = function (models) {
    // Users <-1------------*-> Teams
    Users.hasMany(models.Teams, {
      foreignKey: { name: "username", allowNull: false, unique: true },
    });
  };
  return Users;
};
