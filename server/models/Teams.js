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
      team_name: {
        type: DataTypes.STRING,
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
      foreignKey: { name: "username", allowNull: false },
    });

    // Teams <-1------------*-> Players
    Teams.hasMany(models.Players, {
      foreignKey: { name: "team_id", allowNull: false },
    });
  };

  return Teams;
};
