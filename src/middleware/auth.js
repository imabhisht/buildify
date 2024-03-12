// Middleware for verifying access token in the request header
const { firebase_admin } = require("../init");


module.exports.verifyAccessToken = async (req, res, next) => {
    try {
        // Verify Firebase Access Token from cookies
        const accessToken = req.cookies.id_token;
        if (!accessToken) {
            throw new Error("Access token not found");
        }
        const decodedToken = await firebase_admin.auth().verifyIdToken(accessToken);
        if (!decodedToken) {
            throw new Error("Invalid access token");
        }
        req.auth = decodedToken;
        req.auth.id = decodedToken.uid;
        next();
    } catch (error) {
        res.status(401).json({
            error: error.message
        });
    }
}
