const express = require("express");
const upload = require("../config/multerConfiguration");
const appcontroller = require("../controllers/applicationController");
const { uploadImage, downloadImage } = require("../controllers/imagesController");
const { authenticateToken } = require('../middlewares/authenticateToken');
const { login, register, getUserById, updateUser } = require("../controllers/authController");

const verify = require("../middlewares/validation");

const controller = require("../controllers/projectController");
const imgController = require("../controllers/imagesController");
const { getNearByProjects } = require("../controllers/mapController");


const router = express.Router();

// authenticateToken middleware to authenticate your request with jwt headers in the future
// e.g.
router.get('/test', authenticateToken, (req, res) => {
  res.json({ success: true });
});

// projects 
router.get("/projects/applications", authenticateToken, appcontroller.getAllApplications);
router.get("/projects/:id/applications", authenticateToken, appcontroller.getApplicationById);
router.get("/projects/:id", authenticateToken, controller.getProjectById);
router.get("/projects/owners/:own_id", authenticateToken,appcontroller.getProjectByOwnerId);
router.get("/projects/", controller.getProjects);
router.get("/projects/:project_title", authenticateToken, controller.getProjectByTitle);
router.post(
  "/projects/uploadImage", authenticateToken,
  upload.single("image"),
   uploadImage,
   express.json(),
  controller.addProjects
);
router.put("/projects/:project_id", authenticateToken, verify, controller.updateProjects);
router.delete("/projects/:project_id", authenticateToken, controller.removeProject);
// applications
router.patch("/projects/:id/reapply/applications/:app_id", authenticateToken, appcontroller.reapply);
router.patch("/projects/:id/reject/applications/:app_id", authenticateToken, appcontroller.rejectApplication);
router.patch("/projects/:id/withdraw/applications/:app_id", authenticateToken, appcontroller.withdraw);
router.patch("/projects/:id/approve/applications/:app_id", authenticateToken, appcontroller.approve);
router.patch("/projects/:id/apply", authenticateToken, appcontroller.apply);
router.get("/applications/:id/investors/:inv_id", authenticateToken, appcontroller.getApplicationByInvestorId);
// images
router.post("/images", authenticateToken, upload.single("image"), uploadImage);
router.get("/images/:key", authenticateToken, downloadImage);
// auth
router.get("/users/:id", authenticateToken, getUserById);
router.post("/users/register", register);
router.post("/users/login", login);
router.patch("/users/:id", authenticateToken, updateUser);

// map
router.get('/nearby/projects/:id', authenticateToken, getNearByProjects);

module.exports = router;
