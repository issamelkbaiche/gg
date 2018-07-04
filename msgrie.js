const server = require('net').createServer();
let counter = 0;
let sockets = {};
console.log('Historique des conversations :');
function timestamp(){ 
    const now = new Date();
    return now.getHours()+':'+now.getMinutes();
}
server.on('connection', socket => {
socket.id = counter++;  
  
console.log('nouveau client connecté');
socket.write('Bienvenue, entrez votre nom : ! \n');

socket.on('data', data => {
    if (!sockets[socket.id]){
        socket.name = data.toString().trim();
        socket.write('Welcome '+ socket.name +'!\n');
        console.log(socket.name+' s est connecté');
        sockets[socket.id] = socket;
        return;
        
    }

    Object.entries(sockets).forEach(([key, cs]) =>{
       
        if (socket.id == key) return;
        cs.write(timestamp()+'_' + socket.name +' : ');
        cs.write(data);
        
         
    });
    console.log(timestamp() + '_' + socket.name + ' : ' + data);
});

socket.on('end', () =>{

    delete sockets[socket.id];
    console.log(socket.name+' s est déconnecté :( ');
    
});
});
        
        
server.listen(9143, () => console.log('server bound'));
