// imports the Express library to make our server code simpler.
var express = require('express');

// initialized our app using the express() method - this creates an instance of the Express class.
// basically, you can think of this as a server API. when using express, all core server functions
// should use app.
var app = express();

// options for our static assets (more on that in a second).
// basically, this just tells us that our main page is located at index.html.
var options = {
    index: "index.html"
};

// there are a couple things here. first, app.use('/'... tells us the path we want to use for our main HTML page.
// since we specified index.html as our index, '/' will default to index.html. now, if you have test.html in your
// public folder, you can simply use '/test.html' to access that page (check out the GitHub, I did that!).
// this method easily handles our page routing so we don't have to worry about it. just put all the HTML files you want
// in the public folder.
// IMPORTANT: this means that you can not use a custom app.get('/') because this function already creates a route for that
// and you can not have two routes pointing to the same request string.
app.use('/', express.static('public', options));

// this is how you would send a custom response. these are VERY important, as these kinds of functions
// will be how you send data to your front-end. just make sure that you don't use '/' or something
// that shares a name with any other HTML files. you'll get an error like I said above, because
// you have two functions sharing the same GET request. the server won't know which one to use!
app.get('/message', function (req, res) {
    res.send('This is my message.')
})

// now we tell the server to listen on the port provided by Heroku (if it exists) or 8000 by default
// and we print a message telling us that it's running. easy!
var server = app.listen(process.env.PORT || 8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('my app is listening at http://localhost:%s', port);
});