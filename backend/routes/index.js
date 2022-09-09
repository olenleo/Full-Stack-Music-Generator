const express = require("express");
const router = express.Router();
const controller = require("../controllers/file.controller");
let routes = (app) => {
  router.post("/api/upload", controller.upload);
  router.get("/api/getList", controller.getListFiles);
  router.get("/api/files/:name", controller.download);
  router.delete("/api/delete/:name", controller.remove)
  app.use(router);
};
module.exports = routes;