var router = require("express").Router();
const moviesDirectory = require("./../../config").VIDEOS_DIRECTORY;
const fs = require('fs')
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
    if (!req.files.video || !req.files.subtitle) {
      res.status(404).send({
        status: false,
        message: "No file uploaded",
      });
      return;
    } else {
      try {
        let video = req.files.video.name.match(
          /^.*\.(mkv|mov|avi|wmv|flv|3gp|mp4|mpg)$/gi
        );
        let subtitle = req.files.subtitle.name.match(/^.*\.(srt)$/gi);
  
      } catch (error) {
        console.log('ridi...');
      }
  
      if (!subtitle || !video) {
        res.status(404).send({
          status: false,
          message: "Need send one (.srt) file and one video file",
          supported_formats: "mkv mov avi wmv flv 3gp mp4 mpg",
        });
        return;
      }

      try {
        fs.mkdir(`${moviesDirectory}/${req.body.name}`)
      } catch (error) {
        
      }

      let vPath = `${req.files.video.name}`;
      let sPath = `${req.files.subtitle.name}`;
      let category = req.body.category || "movie";
      try {
              req.files.video.mv(`${moviesDirectory}/${req.body.name}/${vPath}`);
      req.files.subtitle.mv(`${moviesDirectory}/${req.body.name}/${sPath}`);
      } catch (error) {
        console.log('ridi...');
      }


      try {
        let d = await insertVideo(
          req.body.name,
          vPath,
          sPath,
          video.size,
          category
        );
      } catch (error) {
        res.status(400).send({
          status: false,
          message: `Name is Duplicate`,
        });
      }

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
