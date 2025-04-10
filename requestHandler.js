const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');


function main(response) {
    mariadb.query("SELECT * FROM product;", function(err, rows) {
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();

}

function orderList(response) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist;", function(err, rows) {
    response.write(orderlist_view);

        rows.forEach((el) => {
            response.write("<tr>" 
                +"<td>"+ el.product_id +"</td>"
                +"<td>"+ el.order_date +"</td>"
            +"</tr>")
        })

        response.write('</table>');
        response.end();
    });
}


function styleMain(response) {
    fs.readFile('./main.css', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/css'});
        response.write(data);
        response.end();
    })
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function (err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}
function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function (err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}
function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function (err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES("+ productId +", '"+ new Date().toLocaleDateString() +"')", 
    function(err, data) {
        if(err) {
            console.log(err);
        }
        console.log(data);
    })

    response.write('order page');
    response.end();
}


let handle = {}; // key : value 
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderList;

// css 적용
handle['/main.css'] = styleMain;

/* image directory : 이미지 경로 */ 
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;