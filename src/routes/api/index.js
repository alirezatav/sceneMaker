var router = require("express").Router();

router.use("/makeScene", require("./makeScene"));
router.use("/uploadVideo", require("./video"));
module.exports = router;
