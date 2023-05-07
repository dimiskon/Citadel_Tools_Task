"use strict";

module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define(
    "Teams",
    {
      team_id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      signed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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

  Teams.associate = function (models) {
    // Teams <-*------------1-> Users
    Teams.belongsTo(models.Users, {
      foreignKey: { name: "user_id", allowNull: false, unique: true },
    });

    // Teams <-1------------*-> Players
    Teams.hasMany(models.Players, {
      foreignKey: { name: "team_id", allowNull: false, unique: true },
    });
  };

  return Teams;
};
