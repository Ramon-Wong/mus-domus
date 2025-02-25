import { printMessage, _CreateElement, _CreateForm} from './functions.js';



document.addEventListener('DOMContentLoaded', async () => {

	const eventSource				= new EventSource('/events');

	const body						= document.body;
	const app						= _CreateElement( document.getElementById('loader'),	'app',				' ');
	const rightMenu					= _CreateElement( document.createElement('div'), 		'right-menu',		'vertical-menu');
	const loginButton				= _CreateElement( document.createElement('div'), 		'login-button',		'floating-login');
	const login						= _CreateElement( document.createElement('div'), 		'login-div',		'login-div');
	const overlay					= _CreateElement( document.createElement('div'), 		'overlay',			'overlay');
	
	loginButton.textContent			='login';
	loginButton.addEventListener('click', () =>{
		GetLoginMenu();
		console.log("Login form request");
	});


	const fields = [
		{ type: 'text', id: 'username', name: 'username', label: 'Username:' },
		{ type: 'password', id: 'password', name: 'password', label: 'Password:' }
	];


	document.addEventListener('keydown', (event) => {
		if(event.key === 'Escape' && login.classList.contains('active')) {
			console.log("ESCAPE");
			ClearOverlay();
		}		
	});



	login.appendChild(_CreateForm( fields));

	
	function GetLoginMenu(){
		overlay.classList.add('active'); 
		login.classList.add('active');

		console.log('item clicked 5');
	}

	function ClearOverlay(){
		overlay.className	= 'overlay'; 
		login.className		= 'login-div';

		console.log('item clicked 6');
	}

	const menuItems = [	{ id: 'rightMenu-item-1', text: 'Item 1', callback: () => { console.log('item clicked 1');} },
						{ id: 'rightMenu-item-2', text: 'Item 2', callback: () => { console.log('item clicked 2');} },
						{ id: 'rightMenu-item-3', text: 'Item 3', callback: () => { console.log('item clicked 3');} },
						{ id: 'rightMenu-item-4', text: 'Item 4', callback: () => { console.log('item clicked 4');} },
						{ id: 'rightMenu-item-5', text: 'Item 5', callback: () => { GetLoginMenu();} },
						{ id: 'rightMenu-item-6', text: 'Item 6', callback: () => { ClearOverlay();} }];

	menuItems.forEach( item => {	
		const link			= document.createElement('a');
		link.id				= item.id;
		link.href			= '#';
		link.textContent	= item.text;
		link.addEventListener('click', (e) => {	 item.callback();});

		rightMenu.appendChild(link);
	});


	body.appendChild(overlay);
	body.appendChild(loginButton);
	body.appendChild(login);
	body.appendChild(rightMenu);
	body.appendChild(app);
	
	rightMenu.addEventListener('mouseleave', () => { rightMenu.style.display = 'none'; })

	document.addEventListener('contextmenu', (e) => {
		// if( window.getComputedStyle(login).display === 'none'){ }
		e.preventDefault();
		const x = e.clientX;
		const y = e.clientY;
		
		console.log(`Right-click at (${x}, ${y})`);
		rightMenu.style.left		= `${x}px`;
		rightMenu.style.top			= `${y}px`;
		rightMenu.style.display		= 'block'; // Show the menu

	});

	eventSource.onmessage = function(event){
		const message = JSON.parse(event.data);
		console.log(message);
	};

	eventSource.onerror = (err) => {
		console.error("EventSource Error:", err);
		eventSource.close();			// Close old connection
	};
});