var router = require("express").Router();

router.use("/make-scene", require("./makeScene"));
router.use("/upload-video", require("./video"));
module.exports = router;
