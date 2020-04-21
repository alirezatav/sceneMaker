var router = require("express").Router();
const moviesDirectory = require("./../../config").VIDEOS_DIRECTORY;

const fs = require("fs");
const download = require("download");
router.post("/", async (req, res) => {
  console.log(44);
  let { video_link, subtitle_link, name } = req.body;
  if (!video_link || !subtitle_link || !name) {
    res.status(404).json({
      status: false,
      message: `send video link and subtitle link and name`,
    });
  }
  try {
    fs.mkdirSync(`${moviesDirectory}/${name}`);

    let v = await download(video_link, `${moviesDirectory}/${name}`);
    let s = await download(subtitle_link, `${moviesDirectory}/${name}`);

    const vPath = `${name}/${video_link.split("/").pop()}`;
    const sPath = `${name}/${subtitle_link.split("/").pop()}`;

    let category = req.body.category || "movie";

    let d = await insertVideo(
      req.body.name,
      vPath,
      sPath,
      parseInt(v.length / 1000),
      req.body.category
    );

    res.status(200).json({
      status: true,
      video_id: d.rows[0].id,
      message: ` ${d.command} ${d.rowCount} Rows`,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: `Folder ${name} already exists.`,
    });
  }
});
module.exports = router;
