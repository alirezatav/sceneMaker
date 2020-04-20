const { exec } = require("child_process");
function trimMedia(input, output, start, duration) {
  return new Promise((res, rej) => {
    exec(
      `ffmpeg -ss ${start / 1000} -i ${input} -t ${
        duration / 1000
      } -strict experimental ${output}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log("ffmpeg :",err,stdout,stderr);
          rej(err);
          return ;
        } else {
          res(stdout);
        }
      }
    );
  });
}

module.exports = { trimMedia };
