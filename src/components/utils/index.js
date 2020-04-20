// var ffmpeg = require("fluent-ffmpeg");
var path = require("path");
var ffmpeg = require("ffmpeg");

function trimMedia(input, output, start, duration) {
  console.log("output :", output);
  console.log("input :", input);
  console.log("-------------- :");
  console.log(__dirname);
  console.log(process.cwd());
  console.log("path.join(__d", path.join(__dirname, "XXX"));

  return new Promise((res, rej) => {
    try {
      new ffmpeg2(input, function (err, video) {
        if (!err) {
          console.log("The video is ready to be processed");
        } else {
          console.log("Error: " + err);
        }
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.msg);
    }

    // let output =
    //   "../../../resources/Movies/seven-world-one-planet-e1/scenes/hunt/hunt-1587396383112.mp4";
    // let input = "./";
    // ffmpeg(input)
    //   .setStartTime(start / 1000)
    //   .setDuration(duration / 1000)
    //   .output(output)
    //   .on("end", function (err) {
    //     if (!err) {
    //       res(true);
    //     } else rej(false);
    //   })
    //   .on("error", function (err) {
    //     rej(false);
    //     console.log("FFMEPG ERROR: ", +err);
    //   })
    //   .run();
  });
}
// let command = `  ffmpeg -ss ${start} -i ${input} -c copy -t ${duration} -strict experimental ${output}  `;
// executeFfmpeg(command)
module.exports = { trimMedia };
