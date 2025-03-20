const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();

const prisma = new PrismaClient();

app.use(express.urlencoded());

app.post("/auth", async function (req, res) {
    const streamkey = req.body.key;
    const streamname = req.body.name;
    console.log(streamname);

    try{
        const user = await prisma.user.findUnique({ where: { username: streamname }});

        if(!user){
            console.log("User does not exist");
            res.status(404).send();
        }

        if(user.streamkey == streamkey){
            console.log("Correct stream key");

            const update = await prisma.user.update({
                data: {
                    isLive: true,
                },
                where: {
                    username: streamname,
                }
            });

            console.log(update.isLive);

            res.status(200).send();
        }

        console.log("Streamkey does not match");
        res.status(403).send();

    } catch(e){
        console.log("Auth Server: Some error occurred\n", e);

        res.status(500).send();
    }

});

app.post("/stop", async function (req, res) {
    const streamname = req.body.name;
    console.log(`${streamname} has stopped streaming`);

    try{
        const update = await prisma.user.update({
            data: {
                isLive: false,
            },
            where: {
                username: streamname,
            }
        });
    }catch(e) {
        console.log("Auth Server /stop error: ", e);
    }

    res.status(200).send();
})

app.listen(8000, function() {
    console.log("Listening on port 8000");
})

