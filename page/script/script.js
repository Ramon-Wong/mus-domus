



document.addEventListener('DOMContentLoaded', async () => {

	const body						= document.body;
	const app						= document.getElementById('loader');

	const eventSource				= new EventSource('/events');
	const rightMenu					= document.createElement('div');
	const header					= document.createElement('div');

	app.id							= 'app';
	app.className					= ' ';

	rightMenu.id					= 'right-menu';
	rightMenu.className				= 'vertical-menu';

	header.id						= 'header';
	

	const menuItems = [	{ id: 'rightMenu-item-1', text: 'Item 1', callback: () => { console.log('item clicked 1');} },
						{ id: 'rightMenu-item-2', text: 'Item 2', callback: () => { console.log('item clicked 2');} },
						{ id: 'rightMenu-item-3', text: 'Item 3', callback: () => { console.log('item clicked 3');} },
						{ id: 'rightMenu-item-4', text: 'Item 4', callback: () => { console.log('item clicked 4');} },
						{ id: 'rightMenu-item-5', text: 'Item 5', callback: () => { console.log('item clicked 5');} },
						{ id: 'rightMenu-item-6', text: 'Item 6', callback: () => { console.log('item clicked 6');} }];

	menuItems.forEach( item => {	
		const link			= document.createElement('a');
		link.id				= item.id;
		link.href			= '#';
		link.textContent	= item.text;
		link.addEventListener('click', (e) => {	 item.callback();});

		rightMenu.appendChild(link);
	});

	body.appendChild(rightMenu);
	body.appendChild(header);
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

	eventSource.onmessage = function(event){
		const message = JSON.parse(event.data);
		console.log(message);
	};

	eventSource.onerror = (err) => {
		console.error("EventSource Error:", err);
		eventSource.close();			// Close old connection
	};
});