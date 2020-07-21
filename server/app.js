const Express = require("express")();
const Http = require("http").Server(Express);
const SocketIo = require("socket.io")(Http);

let position = {
    x: 200,
    y: 200
};

SocketIo.on("connection", socket =>{
    socket.emit("position", position);
    socket.on("move", data => {
        switch(data) {
            case "left":
                position.x = position.x - 5;
                SocketIo.emit("position", position);
                break;
            case "right":
                position.x = position.x + 5;
                SocketIo.emit("position", position);
                break;
            case "down":
                position.y = position.y + 5;
                SocketIo.emit("position", position);
                break;
            case "up":
                position.y = position.y - 5;
                SocketIo.emit("position", position);
                break;
            default:
                break;
        }
    })

});

Http.listen(3000, () => {
    console.log("listening at :3000...");
});