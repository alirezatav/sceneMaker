var ffmpeg = require("fluent-ffmpeg");
var path = require("path");

function trimMedia(input, output, start, duration) {
  console.log("output :", output);
  console.log("input :", input);
  console.log("-------------- :");
  console.log(__dirname);  
  console.log(process.cwd());
  console.log("path.join(__d", path.join(__dirname, "XXX"));

  return new Promise((res, rej) => {
    let output='/home/weblate/sceneMaker/resources/Movies/seven-world-one-planet-e1/scenes/hunt/hunt-1587396383112.mp4'
    let input='/home/weblate/sceneMaker/resources/Movies/seven-world-one-planet-e1/Seven.Worlds.One.Planet.S01E01.mkv'
    ffmpeg(input)
      .setStartTime(start / 1000)
      .setDuration(duration / 1000)
      .output(output)
      .on("end", function (err) {
        if (!err) {
          res(true);
        } else rej(false);
      })
      .on("error", function (err) {
        rej(false);
        console.log("FFMEPG ERROR: ", +err);
      })
      .run();
  });
}

module.exports = { trimMedia };
