const router = require("express").Router();
let getVideoWords = require("../../components/utils/db.getVideoWords");
router.get("/", async (req, res, next) => {
  let data = await getVideoWords(req.query.id);
  res.status(200).json({
    status: true,
    data: data.rows,
  });
});

module.exports = router;
