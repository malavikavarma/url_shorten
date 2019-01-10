module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      picurl: DataTypes.STRING,
      emailid: DataTypes.STRING,
    },
    {},
  );

  return users;
};
