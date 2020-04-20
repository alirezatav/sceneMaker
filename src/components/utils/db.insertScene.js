const db = require("./../../db/psql");
function insertScene(word, video_id, vPath, sPath, start_time, end_time) {
  let sql =
    "INSERT INTO dictionary_scenes (word,video_id,video_path, subtitle_path,start_time,end_time) VALUES ($1, $2,$3,$4,$5,$6) ";
  let values = [word, video_id, vPath, sPath, start_time, end_time];
  return db.query(sql, values);
}

module.exports = insertScene;
