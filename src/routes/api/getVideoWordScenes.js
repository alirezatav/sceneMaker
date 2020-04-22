const router = require("express").Router();
let getVideoWordScenes = require("../../components/utils/db.getVideoWordScenes");
let static_url = require("./../../config").STATIC;
router.get("/", async (req, res, next) => {
  let data = await getVideoWordScenes(req.query.id, req.query.word);
  res.status(200).json({
    status: true,
    data: data.rows.map((a) => ({
      ...a,
      link: static_url + "/"+a.video_name+"scenes/" + a.word + "/" + a.video_path,
    })),
  });
});

module.exports = router;
