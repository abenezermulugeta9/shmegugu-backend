const { getUserById } = require("../services/authService");
const { getNearbyProjects } = require("../services/mapService");

module.exports.getNearByProjects = async (req, res, next) => {
    const { id } = req.params;
    const currentUser = await getUserById(id);
    const long = currentUser.location.coordinates[0];
    const lat = currentUser.location.coordinates[1];
    const projectsNearBy = await getNearbyProjects(long, lat);

    res.status(200).json( projectsNearBy );
};