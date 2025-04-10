function route(pathname, handle, response) {
    console.log('pathname : ' + pathname);
    if(typeof handle[pathname] == 'function') {
        handle[pathname](response);
    } else {
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.write('Not Found : Error 404');
        response.end();
    }
}

exports.route = route;