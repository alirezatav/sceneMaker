var ffmpeg = require("fluent-ffmpeg");

function trimMedia(input, output, start, duration) {
  console.log("output :", output);
  console.log("input :", input);
  console.log("duration :", duration);
  console.log("start :", start);
  return new Promise((res, rej) => {
    let command = `  ffmpeg -ss ${start} -i ${input} -c copy -t ${duration} ${output}  `;
    // ffmpeg(input)
    // .addInputOption("-strict experimental")
    // .setStartTime(start / 1000)
    // .setDuration(duration / 1000)
    // .output(output)
    executeFfmpeg(command)
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

const executeFfmpeg = (args) => {
  let command = fluent().output(" "); // pass "Invalid output" validation
  command._outputs[0].isFile = false; // disable adding "-y" argument
  command._outputs[0].target = ""; // bypass "Unable to find a suitable output format for ' '"
  command._global.get = () => {
    // append custom arguments
    return typeof args === "string" ? args.split(" ") : args;
  };
  return command;
};
module.exports = { trimMedia };
