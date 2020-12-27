const Users = require("./../models/user");


module.exports = (app) => {
    app.post("/users/adduser", (req, res) => {
        Users.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            }
        )
            .then(() => {
                res.status(200).send("Created new user")
            })
            .catch(err => {
                throw new Error(err);
            })
    });

    app.get("/users/getall", (req, res) => {
        Users.findAll()
            .then(response => res.status(200).send(response))
            .catch(err => {
                throw new Error(err)
            })
    })
};
