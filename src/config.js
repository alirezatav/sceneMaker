//Export video config
const config = {
  SCENE_LEFT_MARGIN: 5000,
  SCENE_RIGHT_MARGIN: 5000,
  VIDEO_LEFT_MARGIN: 0,
  VIDEO_RIGHT_MARGIN: 700,
  VIDEOS_DIRECTORY: "resources/videos",
};

//postgres database
const postgres = {
  DATABASE_NAME: "weblatedb",
  DATABASE_HOST: "127.0.0.1",
  DATABASE_USERNAME: "weblate",
  DATABASE_PASSWORD: "weblate",
  DATABASE_PORT: 5432,
};
const api = {
  BASE_URL: "http://185.120.221.230:4000/api/",
  STATIC: "http://185.120.221.230:4000/static/",
};
module.exports = { ...config, ...postgres, ...api };
