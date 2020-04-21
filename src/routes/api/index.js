var router = require("express").Router();

router.use("/make-scene", require("./makeScene"));
router.use("/upload-video", require("./videoUpload"));
router.use("/download-video", require("./videoDownload"));
router.use("/import-video", require("./importLocalVideos"));
router.use("/get-videos", require("./getVideos"));

router.use("/get-video-word-scenes", require("./getVideoWordScenes"));
router.use("/get-video-words", require("./getVideoWords"));
module.exports = router;
    