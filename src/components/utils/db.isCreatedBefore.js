const db = require("./../../db/psql");
function isCreatedBefore(name, word) {
  let sql =
    "select  v.video_path from dictionary_videos as v " +
    "left join dictionary_scenes as s " +
    "on v.id=s.video_id " +
    "where name=$1 " +
    "and word=$2  limit 1";
  let values = [name, word];
  return db.query(sql, values);
}

module.exports = isCreatedBefore;
