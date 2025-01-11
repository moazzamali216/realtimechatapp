const io = require("socket.io")(8000, {
    cors: {
        origin: ["http://127.0.0.1:5500", "http://192.168.100.47:5500"], // Allow multiple origins
        methods: ["GET", "POST"], // Allow GET and POST methods
    }
});


const users = {};

io.on("connection", socket => {
    console.log("New connection established");

    socket.on('new-user-joined', name => {
        console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name); // Notify other users
        console.log(name);
    });

    socket.on('send', message => {
        // Use socket.id to get the username and send the message to others
        socket.broadcast.emit("received", { message: message, name: users[socket.id] });
    });

    socket.on("disconnect", () => {
            socket.broadcast.emit("left",users[socket.id])
            delete users[socket.id]
    });
});


