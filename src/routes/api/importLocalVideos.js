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
 

  async function importLocalVideos(c) {
    let current = localVideos[c];
     
    let isDirectory = fs
      .lstatSync(`${moviesDirectory}/${current}`)
      .isDirectory();
    if (!isDirectory) {
      return next_dir(c);
    }
    
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
        
        let vPath = `${video_file}`;
        let sPath = `${subtitle_file}`;
        let vSize = fs.statSync(`${moviesDirectory}/${current}/${vPath}`).size;
        let category = "movie";
        let d = await insertVideo(current, vPath, sPath, vSize, category);
        next_dir(c)
      }
    }
  }
  function next_dir(c) {
    if (localVideos[c + 1]) {
      return importLocalVideos(c + 1);
    }else{
      res.status(200).json({
        status: true,
      });
    }
  }
});

module.exports = router;
