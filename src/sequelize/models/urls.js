module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define(
    'urls',
    {
      fullurl: DataTypes.STRING,
      countclicks: DataTypes.INTEGER,
    },
    {},
  );

  return urls;
};
