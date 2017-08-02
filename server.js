'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: process.env.port || 3000 
});


server.route({  
    path: '/',
    method: 'GET',
    handler: function(request, reply) {
        reply('This is the default route');
    }
});


// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {

        return reply('hello');
    }
});

// Add the route
server.route({
    method: 'GET',
    path:'/hola', 
    handler: function (request, reply) {
        
        return reply('hola<br> mundo');
    }
});

//handle static files
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/tree',
        handler: function (request, reply) {
            reply.file('public/tree.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/{folder}/{filename}',
        handler: function (request, reply) {
            reply.file(request.params.folder + "/" +request.params.filename);
        }
    });
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
module.exports = server;