var router = require("express").Router();
var makeScene = require("./../../components/makeScene/makeScene");
const getVideoDetails = require("./../../components/utils/db.getVideoDetails");
const moviesDirectory = require("./../../config").MOVIES_DIRECTORY;
router.post("/", async (req, res, next) => {
  try {
    var response = await getVideoDetails(req.body.video_id);
  } catch (error) {
    res.status(404).json({ status: false, message: "VIDEO NOT FOUND" });
  }

  let { id, video_path, subtitle_path, name } = response.rows[0];

  try {
    var ms = makeScene(id, video_path, subtitle_path, req.body.word);
    ms.createScenes();
    ms.render();
    var data = ms.getScenes();
  } catch (error) {
    res.status(500).json({ status: false, message: "INTERNAL ERROR" });
  }
  let result = `${moviesDirectory}/${name}/scenes`;
  res.status(200).json({
    status: "ok",
    message: `Your exprot request for  ${name} is being processed .`,
    data: { scenes: data },
  });
});

module.exports = router;
