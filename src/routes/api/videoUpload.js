var router = require("express").Router();
const moviesDirectory = require("./../../config").VIDEOS_DIRECTORY;
const insertVideo = require("./../../components/utils/db.insertVideo");
router.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(404).send({
        status: false,
        message: "Please send 'name' parameter",
      });
      return;
    }
    if (!req.files) {
      res.status(404).send({
        status: false,
        message: "No file uploaded",
      });
      return;
    } else {
      let video = req.files.files.find(
        ({ name }) => !!name.match(/^.*\.(mkv|mov|avi|wmv|flv|3gp|mp4|mpg)$/gi)
      );
      let subtitle = req.files.files.find(
        ({ name }) => !!name.match(/^.*\.(srt)$/gi)
      );
      if (!subtitle || !video) {
        res.status(404).send({
          status: false,
          message: "Need send one (.srt) file and one video file",
          supported_formats: "mkv mov avi wmv flv 3gp mp4 mpg",
        });
        return;
      }

      let vPath = `${req.body.name}/${video.name}`;
      let sPath = `${req.body.name}/${subtitle.name}`;
      let category = req.body.category || "movie";
      video.mv(`${moviesDirectory}/${vPath}`);
      subtitle.mv(`${moviesDirectory}/${sPath}`);

      let d = await insertVideo(
        req.body.name,
        vPath,
        sPath,
        video.size,
        category
      );

      res.send({
        status: true,
        video_id: d.rows[0].id,
        message: ` ${d.command} ${d.rowCount} Rows`,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
