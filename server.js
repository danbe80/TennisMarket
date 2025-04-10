let http = require('http');
let url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        /* 
        favicon.ico error 
        favicon을 찾으려고 해서 나는 에러
        해결 방안으로 그냥 요청을 무시하게끔 한다.
        */ 
        if(request.url.includes("favicon.ico")) return;
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;

        route(pathname, handle, response, queryData.productId);
    }
    
    http.createServer(onRequest).listen(8888);
}

exports.start = start;