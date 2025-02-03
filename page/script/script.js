



document.addEventListener('DOMContentLoaded', async () => {

	const body				= document.body;
	const rightMenu			= document.getElementById('right-menu');
	const eventSource		= new EventSource('/events');

	
	document.getElementById('rightMenu-item-1').addEventListener('click', (e) => {		console.log(`clicked at rightMenu-item-1`);});
	document.getElementById('rightMenu-item-2').addEventListener('click', (e) => {		console.log(`clicked at rightMenu-item-2`);});
	document.getElementById('rightMenu-item-3').addEventListener('click', (e) => {		console.log(`clicked at rightMenu-item-3`);});
	document.getElementById('rightMenu-item-4').addEventListener('click', (e) => {		console.log(`clicked at rightMenu-item-4`);});
	document.getElementById('rightMenu-item-5').addEventListener('click', (e) => {		console.log(`clicked at rightMenu-item-5`);});
	document.getElementById('rightMenu-item-6').addEventListener('click', (e) => {		console.log(`clicked at rightMenu-item-6`);});
	
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