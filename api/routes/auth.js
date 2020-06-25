

module.exports = (app) => {
    app.post("/login", (req, res) => {

        const login = "tkoras@o2.pl";
        const password = "1234";

        if (login === req.body.login && password === req.body.password) {
            console.log("logowanie");
            res.status(200).send("Logged");}
            })

};

/*
token trzymać w redux - poczytac o redux redux-persist

 */