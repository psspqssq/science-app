//backend/routes/user.route.js
let mongoose = require("mongoose"),
	express = require("express"),
	router = express.Router();

// User Model
let userSchema =
	require("../models/User");

// CREATE User
router.post("/create-user",
	(req, res, next) => {
		userSchema.create(req.body).then(results=>{
            res.send(results);
        })});

// READ Users
router.get("/", (req, res) => {
	userSchema.find().then(results=>{
        res.json(results);
    })
});

// UPDATE user
router
    .route("/update-user/:id")
    // Get a single user
    .get((req, res, next) => {
        console.log(req.params);
        userSchema.findById(req.params.id)
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                next(error);
            });
    })
    .put((req, res, next) => {
        console.log(req.params);
        console.log(req.body);
        userSchema.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // To return the updated document
        )
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(data);
            console.log("User updated successfully!");
        })
        .catch(error => {
            console.log(error);
            next(error);
        });
    });

// Delete User
router.delete("/delete-user/:id",
	(req, res, next) => {
		userSchema.findByIdAndDelete(req.params.id)
        .then((data,error) => {
                if (error) {
					return next(error);
				} else {
					res.status(200).json({
						msg: data,
					});
				}
            })
	});

module.exports = router;
