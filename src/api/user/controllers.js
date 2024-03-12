const { logger,firebase_admin, prisma } = require("../../init")


module.exports.createUser = async(req,res) => {
    let flag = 0;
    let user = null;
    try {
        const { email, name, password } = req.body;
        user = await firebase_admin.auth().createUser({
            displayName: name,
            email,
            password
        })
        if (user) flag = 1;

        const user_data = await prisma.user.create({
            data: {
                id: user.uid,
                name: name,
                email: email
            }
        });
        if (user_data) flag += 1;
        logger.debug(`[User-Controller] Account created with id:${user.uid}`)
        const login_token = await firebase_admin.auth().createCustomToken(user.uid);

        //Login the user and set the idToken and refreshToken in the cookies
        
        const user_login = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        const user_login_data = await user_login.json();
        if (user_login_data.error) {
            throw new Error(user_login_data.error.message);
        }

        // Set the idToken and refreshToken in the cookies
        res.cookie('id_token', user_login_data.idToken);
        res.cookie('refresh_token', user_login_data.refreshToken);
        return res.send({message: "User created successfully", token: login_token});

    } catch (error) {
        if (flag === 1) {
            await firebase_admin.auth().deleteUser(user.uid)
        }
        logger.debug(`[User-Controller] Account not created with reason: ${error.message}`)
        return res.status(500).send({message: error.message})
    }
}

module.exports.refreshToken = async(req,res) => {
    try {
        const { refresh_token } = req.cookies;
        const user = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                refresh_token
            })
        });
        const user_data = await user.json();
        if (user_data.error) {
            throw new Error(user_data.error.message);
        }
        res.cookie('id_token', user_data.id_token);
        res.cookie('refresh_token', user_data.refresh_token);
        return res.send({
            message: "Token refreshed successfully", 
            id: user_data.user_id,
            expires_in: user_data.expires_in
        });
    } catch (error) {
        logger.debug(`[User-Controller] Token not refreshed with reason: ${error.message}`)
        return res.status(500).send({message: error.message})
    }

}

module.exports.login = async(req,res) => {
    try {
        const { email, password } = req.body;

        // Check Email and Password
        const user = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        const user_data = await user.json();
        if (user_data.error) {
            throw new Error(user_data.error.message);
        }

        // Set the idToken and refreshToken in the cookies
        res.cookie('id_token', user_data.idToken);
        res.cookie('refresh_token', user_data.refreshToken);

        return res.send({
            message: "User logged in successfully",
            id: user_data.localId,
            email: user_data.email,
            name: user_data.displayName,
            expires_in: user_data.expiresIn
    });

    } catch (error) {
        logger.debug(`[User-Controller] Account not logged in with reason: ${error.message}`)
        return res.status(500).send({message: error.message})
    }
}

module.exports.deleteUser = async(req,res) => {
    try {
        const { id } = req.auth;
        const user = await prisma.user.delete({
            where:{
                id: id
            }
        })
        if (user) {
            await firebase_admin.auth().deleteUser(id);
            logger.debug(`[User-Controller] Account deleted with id:${id}`)
            return res.send({message: "User deleted successfully"})
        }
        return res.status(404).send({message: "User not found"})
    } catch (error) {
        logger.debug(`[User-Controller] Account not deleted with reason: ${error.message}`)
        return res.status(500).send({message: error.message})
    }
}

module.exports.updateUser = async(req,res) => {
    try {
        const { id } = req.auth;
        const { name, email } = req.body;
        
        // First update the DB and then the firebase
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email
            }
        });
        if (user) {
            await firebase_admin.auth().updateUser(user.id, {
                displayName: user.name,
            })
            logger.debug(`[User-Controller] Account updated with id:${id}`)
            return res.send({message: "User updated successfully"})
        }
        return res.status(404).send({message: "User not found"})
    } catch (error) {
        logger.debug(`[User-Controller] Account not updated with reason: ${error.message}`)
        return res.status(500).send({message: error.message})
    }
}