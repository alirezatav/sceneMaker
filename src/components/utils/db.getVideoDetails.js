const db = require("./../../db/psql");
function getVideoDetails(id) {
  let sql = "SELECT *  FROM dictionary_videos WHERE id=($1) limit 1 ";
  let values = [id];
  return db.query(sql, values);
}

module.exports = getVideoDetails;
