const db = require("./../../db/psql");
function getVideoWords(videId) {
  let sql = "SELECT  distinct dictionary_videos.name,dictionary_videos.id,  word ,count(word) FROM dictionary_scenes left join dictionary_videos on dictionary_scenes.video_id=dictionary_videos.id WHERE video_id=$1 group by word,dictionary_videos.name,dictionary_videos.id";
  let values = [videId];
  return db.query(sql, values);
}

module.exports = getVideoWords;
