var StaticServer = require("static-server");
var server = new StaticServer({
    rootPath:"./dist/", // . means the root
    // then from he root (.) choose the path for your folder target
    port: 8000
});

server.start(function () {
  console.log("Server starts at the port : ", server.port);
});
 

