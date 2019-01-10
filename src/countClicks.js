import DB from './sequelize/models/index';

const Sequelize = require('sequelize');

const noOfClicks = (req, res, next) => {
  DB.urls.update(
    {
      countclicks: Sequelize.literal('countclicks + 1'),
    },
    { where: { id: req.params.shortId } },
  );
  next();
};

export default noOfClicks;
