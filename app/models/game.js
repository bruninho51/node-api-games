'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};