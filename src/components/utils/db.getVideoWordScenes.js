const db = require("./../../db/psql");
function getVideoWordScenes(videId, word) {
  let sql =
    "SELECT v.name as video_name,s.* from dictionary_scenes   as s left join dictionary_videos as v on s.video_id=v.id where video_id=$1 and word=$2";
  let values = [videId, word];
  return db.query(sql, values);
}

module.exports = getVideoWordScenes;
