import Server from "./Classes/server";
import router from "./routes/router";
import cors from 'cors';
import bodyParser from "body-parser";

const server = Server.instance;

// server.app.use(express.static('public'));

server.app.use(cors({ origin: true, credentials: true }));

server.app.use(bodyParser.json());

server.app.use(bodyParser.urlencoded({ extended: true }));

server.app.use(router);

server.start(() => {
    console.log(`El servidor esta corriendo en el puerto: ${server.port}`);
});