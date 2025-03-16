const express = require('express');
const app = express();

app.use(express.urlencoded());

app.post("/auth", function (req, res) {
    const streamkey = req.body.key;
    const streamname = req.body.name;
    console.log(streamname);

    if(streamkey === "supersecret"){
        res.status(200).send();
        return;
    }

    res.status(403).send();
});

app.listen(8000, function() {
    console.log("Listening on port 8000");
})

