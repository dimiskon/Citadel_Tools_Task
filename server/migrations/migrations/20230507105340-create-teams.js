"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Teams", {
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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
        unique: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Teams");
  },
};
