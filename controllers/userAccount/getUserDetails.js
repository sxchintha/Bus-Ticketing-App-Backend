
const User = require('../../models/iUser.model');

// get the user details
const getUserDetails = async (req, res) => {
    // get the user details
    User.findOne({ nic: req.params.userID })
        .then(user => {
            if (user) {
                res.json({
                    message: "User details fetched successfully",
                    resCode: 200,
                    userDetails: user
                })
            } else {
                res.json({
                    message: "User not found",
                    resCode: 400,
                    userDetails: null
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                message: "Error fetching user details",
                resCode: 401,
                error: err
            })
        });
}


module.exports = getUserDetails;