const router = require("express").Router();
let getVideoWordScenes = require("../../components/utils/db.getVideoWordScenes");
router.get("/", async (req, res, next) => {
  let data = await getVideoWordScenes(req.query.id,req.query.word);
  res.status(200).json({
    status: true,
    data:data.rows,
  });
});

module.exports = router;
