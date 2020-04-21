const router = require("express").Router();
let getVideos = require("../../components/utils/db.getVideos");
router.get("/", async (req, res, next) => {
  let data = await getVideos();
  res.status(200).json({
    status: true,
    data:data.rows,
  });
});

module.exports = router;
