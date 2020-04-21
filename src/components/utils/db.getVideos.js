const db = require("../../db/psql");
function getVideos() {
  let sql = "SELECT *  FROM dictionary_videos";
  return db.query(sql);
}

module.exports = getVideos;
