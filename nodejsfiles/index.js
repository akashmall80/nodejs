const http = require('http');
const port = 8000;

//to read files
const fs =  require('fs');

function requestHandler(req,res)
{
    // we will get the url
    // for localhost:8000 it will give /
    // for localhost:8000/user it will give /user
    // for localhost:8000/prifle it will give /profile
    console.log(req.url);

    res.writeHead(200, {'content-type':'text/html'})
    

    //fs is required readfile is asynchronous function ./index.html path of the file ./ is used because index.html is at same level err is error data is file data 
    // fs.readFile('./index.html',function(err,data){
    //   if(err)
    //   {
    //     console.log(err);
    //     return res.end('<h1>error</h1>')
    //   }
    //   return res.end(data);
    // })
    //it will give response
    // res.end('<h1>Gothcha</h1>');

    let filePath;
    switch(req.url){
        case '/':
            filePath = './index.html'
            break;
         case '/profile':
            filePath = './profile.html'
            break;

           default:
            filePath = './404.html'    
    }

   fs.readFile(filePath,function(err,data){
    if(err)
    {
        console.log('error',err);
        return res.end("<h1>Error</h1>")
    }
    return res.end(data);
   })
}

const server = http.createServer(requestHandler);

server.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("server is running", port);
})