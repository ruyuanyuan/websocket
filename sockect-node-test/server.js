

var ws = require("nodejs-websocket")
var Port=3000;

var clientCount =0;

var server = ws.createServer(function (conn) {
    
    clientCount++
    conn.nickname='user'+clientCount
    broadcast(conn.nickname+'<br/><br/>')
	conn.on("text", function (str) {
        broadcast(str)
		// conn.sendText(str)
	})
	conn.on("close", function (code, reason) {
		broadcast(conn.nickname+'<br/><br/>')
    })
    conn.on("error", function (err) {
        console.log("Connection err")
        console.log(err)
	})
}).listen(Port)
console.log('listening to port'+Port);

function broadcast(str){
    server.connections.forEach(function(connection){
        connection.sendText(str)
    })
}