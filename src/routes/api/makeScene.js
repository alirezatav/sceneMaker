var router = require("express").Router();
var makeScene = require("./../../components/makeScene/makeScene");
const getVideoDetails = require("./../../components/utils/db.getVideoDetails");
const isCreatedBefore = require("./../../components/utils/db.isCreatedBefore");

router.post("/", async (req, res, next) => {
  var response = await getVideoDetails(req.body.video_id);
  if (response.rows.length < 1) {
    res.status(404).json({ status: false, message: "VIDEO NOT FOUND" });
  }
  let { id, video_path, subtitle_path, name } = response.rows[0];
  const created = await isCreatedBefore(name, req.body.word);

  var ms = makeScene(id, video_path, subtitle_path, req.body.word);
  ms.createScenes();
  var data = ms.getScenes();

  if (created.rows.length < 0) {
    try {
      ms.render();
      res.status(200).json({
        status: "ok",
        message: `Exporting scenes is underway.`,
        data: { scenes: data },
      });
    } catch (error) {
      res.status(500).json({ status: false, message: "INTERNAL ERROR" });
    }
  }
  else{
    res.status(200).json({
      status: "ok",
      message:'This has been done recently',
      path: `${created.rows[0].video_path.substr(0, created.rows[0].video_path.lastIndexOf("/"))}`,
      data: { scenes: data },
    });
  }




});

module.exports = router;
