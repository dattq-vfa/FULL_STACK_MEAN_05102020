var http = require('http');

//request req 
//response res
//ctrl + c : cancel lenh chay server
http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('<p>Ax<sup>2</sup> + Bx + C = 0</p>');

    res.end();
    
}).listen(3000);