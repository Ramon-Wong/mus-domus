



document.addEventListener('DOMContentLoaded', async () => {

	const body						= document.body;
	const app						= document.getElementById('loader');

	const eventSource				= new EventSource('/events');
	const rightMenu					= document.createElement('div');
	const appMenu					= document.createElement('div');

	app.id							= 'app';
	app.className					= ' ';

	rightMenu.id					= 'right-menu';
	rightMenu.className				= 'vertical-menu';

	appMenu.id						= 'app-Menu'
	appMenu.className				= 'vertical-menu';

	const AppItems = [	{ id: 'appMenu-item-1', text: 'Item 1' },
						{ id: 'appMenu-item-2', text: 'Item 2' },
						{ id: 'appMenu-item-3', text: 'Item 3' },
						{ id: 'appMenu-item-4', text: 'Item 4' }];

	const menuItems = [	{ id: 'rightMenu-item-1', text: 'Item 1' },
						{ id: 'rightMenu-item-2', text: 'Item 2' },
						{ id: 'rightMenu-item-3', text: 'Item 3' },
						{ id: 'rightMenu-item-4', text: 'Item 4' },
						{ id: 'rightMenu-item-5', text: 'Item 5' },
						{ id: 'rightMenu-item-6', text: 'Item 6' }];

	menuItems.forEach( item => {	
		const link			= document.createElement('a');
		link.id				= item.id;
		link.href			= '#';
		link.textContent	= item.text;
		link.addEventListener('click', (e) => {		console.log(`clicked at ${item.id}`);});

		rightMenu.appendChild(link);
	});

	AppItems.forEach( item => {
		const link			= document.createElement('a');
		link.id				= item.id;
		link.href			= '#';
		link.textContent	= item.text;
		link.addEventListener('click', (e) => {		console.log(`clicked at ${item.id}`);});

		appMenu.appendChild(link);
	})

	body.appendChild(appMenu);
	body.appendChild(rightMenu);
	body.appendChild(app);
	
	rightMenu.addEventListener('mouseleave', () => { rightMenu.style.display = 'none'; })

	document.addEventListener('contextmenu', (e) => {	
		e.preventDefault();
		const x = e.clientX;
		const y = e.clientY;
	
		console.log(`Right-click at (${x}, ${y})`);
		rightMenu.style.left		= `${x}px`;
		rightMenu.style.top			= `${y}px`;
		rightMenu.style.display		= 'block'; // Show the menu
	});

	app.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		e.stopPropagation();

		const x = e.clientX;
		const y = e.clientY;

		console.log(`app at (${x}, ${y})`);
		appMenu.style.left			= `${x}px`;
		appMenu.style.top			= `${y}px`;
		appMenu.style.display		= 'block'; // Show the menu
	});

	appMenu.addEventListener('mouseleave', () => { appMenu.style.display = 'none'; })


	eventSource.onmessage = function(event){
		const message = JSON.parse(event.data);
		console.log(message);
	};

	eventSource.onerror = (err) => {
		console.error("EventSource Error:", err);
		eventSource.close();			// Close old connection
	};
});