const router = require("express").Router();
const moviesDirectory = require("./../../config").VIDEOS_DIRECTORY;
const fs = require("fs");
const insertVideo = require("./../../components/utils/db.insertVideo");
const getVideos = require("../../components/utils/db.getVideos");
router.post("/", async (req, res, next) => {
  const localVideos = fs.readdirSync(moviesDirectory);
  const videos = await getVideos();
  const videosList = videos.rows.map((a) => a.name);
  importLocalVideos(0);
  console.log(videosList);
  res.status(200).json({
    status: "ok",
    message: " processing ....",
  });
  async function importLocalVideos(c) {
    let current = localVideos[c];
    console.log("current is ", current);
    let isDirectory = fs
      .lstatSync(`${moviesDirectory}/${current}`)
      .isDirectory();
    if (!isDirectory) {
      return next_dir(c);
    }
    console.log("isDirectory of ", current, "is : ", isDirectory);
    if (videosList.includes(current)) {
      return next_dir(c);
    } else {
      const localFiles = fs.readdirSync(`${moviesDirectory}/${current}`);

      let video_file = localFiles.find(
        (name) => !!name.match(/^.*\.(mkv|mov|avi|wmv|flv|3gp|mp4|mpg)$/gi)
      );
      let subtitle_file = localFiles.find(
        (name) => !!name.match(/^.*\.(srt)$/gi)
      );
      if (!subtitle_file || !video_file) {
    
        return next_dir(c);
      } else {
        console.log("import new videp", video_file);
        let vPath = `${current}/${video_file}`;
        let sPath = `${current}/${subtitle_file}`;
        let vSize = fs.statSync(`${moviesDirectory}/${vPath}`).size;
        let category = "automatic detect";
        let d = await insertVideo(current, vPath, sPath, vSize, category);
        next_dir(c)
      }
    }
  }
  function next_dir(c) {
    if (localVideos[c + 1]) {
      return importLocalVideos(c + 1);
    }
  }
});

module.exports = router;
