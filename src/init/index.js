const FirebaseAdminController = require("./firebase_admin");
const logger = require("./logger");
const firebase_admin = new FirebaseAdminController()

module.exports = {
    firebase_admin:firebase_admin.app,
    logger,
    prisma: require("./prisma")
}