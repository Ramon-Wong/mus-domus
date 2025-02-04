const express																= require('express');
const session																= require('express-session');
const path																	= require('path');
const { _readJSON, _sendMessage, _setupSSE, _addPeekaboo, _Authenticated}	= require('./utils/functions.js');

const app			= express();
const dataPath		= path.join(__dirname, 'data', 'index.json');
const PORT			= 9100;

_addPeekaboo();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
		secret: 'your_secret_key',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 15 * 60 * 1000 }																// 15 mins
	}));

// Serve static files
app.use('/script',      express.static(path.join(__dirname, 'page/script')));
app.use('/style',       express.static(path.join(__dirname, 'page/style')));
app.listen(PORT, () => {console.log(`Server running on http://localhost:${PORT}`);});

// index route
app.get('/', (req, res) => {

	if(!req.session.viewCount){	 req.session.viewCount	= 1; }else{	req.session.viewCount  += 1; }		// Ensure it's a number
	res.sendFile(path.join(__dirname, 'page/index.html'));
	console.peekaboo(`Index page visited ${req.session.viewCount}`);

});


app.get('/events', _setupSSE, (req, res) => {															// when refreshed 
	
	console.peekaboo('Setup SSE Events');
	_sendMessage(app, 'Setup SSE Events');

	req.on('close', () => {		
		req.app.locals.client = null;
		res.end();
	});
});