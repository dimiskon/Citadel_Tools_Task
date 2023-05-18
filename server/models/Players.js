"use strict";

module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define(
    "Players",
    {
      player_id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
      player_name: {
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

  Players.associate = function (models) {
    // Players <-*------------1-> Teams
    Players.belongsTo(models.Teams, {
      foreignKey: { name: "team_id", allowNull: false },
    });
  };

  return Players;
};
