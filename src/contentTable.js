import DB from './sequelize/models/index';

const DBTble = (req, res) => {
  DB.urls
    .findAll({ where: { userid: req.user_id } })
    .then((result) => {
      let table = `<h4 style='color:red'>Already created Short URLs by User ID-${
        req.user_id
      }</h4><table style = 'border: 1px solid ' > <th>ID</th> <th>Full URL</th> <th>Count</th>`;
      table += result
        .map(
          tableValue => `
      <tr>
      <td>${tableValue.id}</td>
      <td>${tableValue.fullurl}</td>
      <td>${tableValue.countclicks}</td>
      </tr>`,
        )
        .reduce((prev, next) => prev + next);
      table += '</table>';
      return res.send(table);
    })
    .catch(error => res.send(error.message).status(400));
};

export default DBTble;
