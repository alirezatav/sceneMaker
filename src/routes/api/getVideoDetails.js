var router = require("express").Router();
const getVideoDetails = require("./../../components/utils/db.getVideoDetails");
router.get("/", async (req, res, next) => {
  var response = await getVideoDetails(req.params.id);
  res.status(200).json({
    status: true,
    data: response.rows,
  });
});
module.exports = router;
