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
    ffmpeg(process.cwd()+'/'+input)
      .addInputOption("-strict experimental")
      .setStartTime(start / 1000)
      .setDuration(duration / 1000)
      .output(process.cwd()+'/'+output)
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
// let command = `  ffmpeg -ss ${start} -i ${input} -c copy -t ${duration} -strict experimental ${output}  `;
// executeFfmpeg(command)

const executeFfmpeg = (args) => {
  let command = ffmpeg().output(" "); // pass "Invalid output" validation
  command._outputs[0].isFile = false; // disable adding "-y" argument
  command._outputs[0].target = ""; // bypass "Unable to find a suitable output format for ' '"
  command._global.get = () => {
    // append custom arguments
    return typeof args === "string" ? args.split(" ") : args;
  };
  return command;
};
module.exports = { trimMedia };
