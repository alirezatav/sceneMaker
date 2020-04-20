var ffmpeg = require("fluent-ffmpeg");

function trimMedia(input, output, start, duration) {
  return new Promise((res, rej) => {
    ffmpeg(input)
      .setStartTime(start / 1000)
      .setDuration(duration / 1000)
      .output(output)
      .inputOptions([ "-strict experimental"])
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
