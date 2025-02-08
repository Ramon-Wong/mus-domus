



document.addEventListener('DOMContentLoaded', async () => {

	const body						= document.body;
	const app						= document.getElementById('loader');

	const eventSource				= new EventSource('/events');
	const rightMenu					= document.createElement('div');
	const login						= document.createElement('div');
	const overlay					= document.createElement('div');

	function CreateForm() {
		const form = document.createElement('form'); // Create the form
		const fields = [
			{ type: 'text', id: 'username', name: 'username', label: 'Username:' },
			{ type: 'password', id: 'password', name: 'password', label: 'Password:' }
		];
	
		fields.forEach(field => {
			const label = document.createElement('label');
			label.textContent = field.label;
			label.setAttribute('for', field.id);
	
			const input = document.createElement('input');
			input.type = field.type;
			input.id = field.id;
			input.name = field.name;
	
			form.appendChild(label);
			form.appendChild(input);
		});
	
		// Create the submit button
		const submitButton = document.createElement('button');
		submitButton.type = 'submit';
		submitButton.textContent = 'Login';
	
		form.appendChild(submitButton);
	
		return form;
	}


	app.id							= 'app';
	app.className					= ' ';

	rightMenu.id					= 'right-menu';
	rightMenu.className				= 'vertical-menu';
	
	overlay.id						= 'overlay';
	overlay.className				= 'overlay';

	login.id						= 'login-div';
	login.className					= 'login-div';

	document.addEventListener('keydown', (event) => {
		if(event.key === 'Escape' && login.classList.contains('active')) {
			console.log("ESCAPE");
			ClearOverlay();
		}		
	});

	login.appendChild(CreateForm());

	
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