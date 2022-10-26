const express = require('express');
const router = express.Router();

const verify = require("../middlewares/validation")
//const checkToken = require("../middlewares/checkToken")

const controller = require("../controllers/projectController")
const imgController = require("../controllers/imagesController")

const upload = require("../config/multerConfiguration");


module.exports = router;

router.get("/projects",
    //checkToken,
    controller.getProjects);

router.get("/project/:project_title",
    //checkToken,
    controller.getProjectByTitle);
 
router.post("/project",
    //checkToken,
    upload.single("file"), 
    imgController.uploadImage, 
    // express.json(),
    verify, controller.addProjects);

router.put("/project/:project_id",
    //checkToken,
    verify, controller.updateProjects);

router.delete("/project/:project_id",
    //checkToken,
    controller.removeProject);