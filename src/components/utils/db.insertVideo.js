const db = require("./../../db/psql");
function insertVideo(name, path, sPath, size, category) {
  var sql =
    "INSERT INTO dictionary_videos (name,video_path, subtitle_path,size,category) VALUES ($1, $2,$3,$4,$5) RETURNING id  ";
  var values = [name, path, sPath, size, category];
  return db.query(sql, values);
}
module.exports = insertVideo;
