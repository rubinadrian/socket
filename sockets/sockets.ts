import  { Socket } from 'socket.io';



export const desconectar = (socket: Socket) => {
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};

export const newMessage = (socket: Socket, io: SocketIO.Server) => {
    socket.on('newMessage', (mensaje: {de:string, mensaje:string}) => {
        console.log('Mensaje recibido', mensaje);

        io.emit('messages', mensaje);
    });
};



