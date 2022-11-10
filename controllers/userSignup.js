const bcrypt = require('bcrypt');
const saltRounds = 10; // For hashing passwords

const User = require("../models/iUser.model");

// Register new User
const userSignUp = async (req, res) => {
    const formData = req.body; // get data from the request body
    // console.log(formData);

    User.findOne({ email: formData.email })
        .then(user => {
            if (user) {
                res.status(400).json({
                    message: "User already exists"
                })
            } else {
                const hashedPassword = bcrypt.hashSync(formData.password, saltRounds); // hash the password
                formData.password = hashedPassword; // set the hashed password to the formData object

                const newUser = new User(formData); // create a new organization
                // console.log(newUser)
                newUser.save() // save the new organization to the database
                    .then(user => {
                        res.status(201).json({
                            message: "User created successfully",
                            user: user
                        })
                    }).catch(err => {
                        res.status(500).json({
                            message: "Error creating User",
                            error: err
                        })
                    })
            }
        }).catch(err => {
            res.status(500).json({
                message: "Error creating User",
                error: err
            })
        })
}

module.exports = {
    userSignUp
}