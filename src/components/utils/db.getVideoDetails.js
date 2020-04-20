const db = require("./../../db/psql");
function getVideoDetails(id) {
  var sql =
    "SELECT *  FROM dictionary_videos WHERE id=($1) ";
  var values = [id];
  return db.query(sql, values);
}

module.exports = getVideoDetails;
