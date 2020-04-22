"use strict";
const fs = require("fs");
const { parse, stringify, resync } = require("subtitle");
const config = require("./../../config");
const { trimMedia } = require("./../utils");
const {
  VIDEOS_DIRECTORY,
  SCENE_LEFT_MARGIN,
  SCENE_RIGHT_MARGIN,
  VIDEO_LEFT_MARGIN,
  VIDEO_RIGHT_MARGIN,
} = config;
const insertScene = require("./../../components/utils/db.insertScene");
function SceneMaker(id, video_path, subtitle_path, w, name) {
  const video_name = name;
  var scenes = [];
  const word = w;
  const videoID = id;
  const videoPath = `${VIDEOS_DIRECTORY}/${video_name}/${video_path}`;
  const subtitlePath = `${VIDEOS_DIRECTORY}/${video_name}/${subtitle_path}`;
  const outScenesPath = makeSceneDirectory(subtitlePath);
  const subtitle = fs.readFileSync(subtitlePath, "utf8");
  const subtitlesMain = [...parse(subtitle)];
  const subtitleArray = [...subtitlesMain.filter(filerByWord)];

  function filerByWord(sub) {
    return sub.text.match(new RegExp("[^A-Za-z]" + word, "gi"));
  }
  function getWord() {
    return word;
  }
  function getSubtitleArray() {
    return subtitleArray;
  }
  function getLeftMargin(sub, index) {
    let startTime = sub.start - SCENE_LEFT_MARGIN;
    let end = sub.end;

    if (startTime > 0) {
      let finded = subtitlesMain.findIndex(
        (s) => s.end > startTime && s.start < end && s.end !== end
      );
      if (finded !== -1) {
        return getLeftMargin(subtitlesMain[finded], finded);
      }
      return { time: sub.start, index };
    } else {
      return { time: 0, index };
    }
  }
  function getRightMargin(sub, index) {
    let endTime = sub.end + SCENE_RIGHT_MARGIN;
    let start = sub.start;
    let reverseSub = [...subtitlesMain].reverse();
    if (endTime <= subtitlesMain[subtitlesMain.length - 1].end) {
      let finded = reverseSub.findIndex(
        (s) => s.start < endTime && s.end > start && s.start !== start
      );
      if (finded !== -1) {
        return getRightMargin(
          reverseSub[finded],
          subtitlesMain.length - finded - 1
        );
      }
      return { time: sub.end, index };
    } else {
      return { time: [subtitlesMain[subtitlesMain.length - 1].end], index };
    }
  }
  function createScenes() {
    scenes = [];
    subtitleArray.map(perform);
    function perform(sub) {
      let isCovered =
        scenes.findIndex((s) => sub.start >= s.start && sub.end <= s.end) === -1
          ? false
          : true;
      if (!isCovered) {
        let firstIndex = subtitlesMain.findIndex(
          (a) => a.start === sub.start && a.end === sub.end
        );

        let left = getLeftMargin(sub, firstIndex),
          right = getRightMargin(sub, firstIndex);

        scenes.push({
          start: left.time,
          end: right.time,
          lef: left.index,
          right: right.index,
          sub: stringify(
            resync(
              [...subtitlesMain].splice(
                left.index,
                right.index - left.index + 1
              ),
              subtitlesMain[left.index].start * -1
            )
          ),
        });
      }
    }
    return this;
  }
  function getScenes() {
    return [...scenes];
  }
  function makeSceneDirectory(p) {
    var path = `${p.substr(0, p.lastIndexOf("/"))}/scenes`;
    try {
      fs.mkdirSync(path);
    } catch (error) {}
    try {
      path = `${path}/${word.replace(/\s/g, ".")}`;
      fs.mkdirSync(path);
    } catch (error) {}
    return path;
  }
  function render() {
    if (scenes.length > 0) trim(0);
  }
  async function trim(i) {
    console.log("Export Started");
    try {
      var correctWord = word.replace(/\s/g, ".");
      await trimMedia(
        videoPath,
        `${outScenesPath}/${correctWord}-${i + 1}.mp4`,
        scenes[i].start - VIDEO_LEFT_MARGIN,
        scenes[i].end - scenes[i].start + VIDEO_RIGHT_MARGIN
      );
      fs.writeFileSync(
        `${outScenesPath}/${correctWord}-${i + 1}.srt`,
        scenes[i].sub
      );

      insertScene(
        word,
        videoID,
        `${correctWord}-${i + 1}.mp4`,
        `${correctWord}-${i + 1}.srt`,
        scenes[i].start - VIDEO_LEFT_MARGIN,
        scenes[i].end + VIDEO_RIGHT_MARGIN
      );
    } catch (error) {
      console.log("error in trimMedia", error);
      return error;
    }

    if (scenes[i + 1]) {
      trim(i + 1);
    } else {
      console.log("Export done");
      return;
    }
  }
  return { getWord, getSubtitleArray, getScenes, createScenes, render };
}

module.exports = function (id, video_path, subtitle_path, word, name) {
  return new SceneMaker(id, video_path, subtitle_path, word, name);
};
