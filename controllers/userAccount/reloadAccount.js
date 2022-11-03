
const User = require('../../models/iUser.model');

const reloadAccount = async (req, res) => {
    const { userID, amount } = req.body;
    try {
        User.findOne({ nic: userID })
            .then(user => {
                if (user) {
                    // update the account balance of the user and save
                    user.accountBalance = user.accountBalance + amount;
                    user.save()
                        .then(user => {
                            res.status(200).json({
                                message: "Account reloaded successfully",
                                newAccountBalance: user.accountBalance
                            })
                        })
                        .catch(err => {
                            console.log(err.message);
                            res.status(400).json({
                                message: "Error reloading account",
                                error: err
                            })
                        });
                } else {
                    return res.status(400).json({
                        message: "User not found"
                    })
                }
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error reloading account",
            error: error
        })
    }
}

module.exports = reloadAccount;
