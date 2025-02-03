const body				= document.body;
const rightMenu			= document.getElementById('right-menu');

document.addEventListener('contextmenu', (e) => {	
	e.preventDefault(); console.log("right click");

    // Get the x and y coordinates of the right-click
	const x = e.clientX;
	const y = e.clientY;

	console.log(`Right-click at (${x}, ${y})`);
	rightMenu.style.left = `${x}px`;
	rightMenu.style.top = `${y}px`;
	rightMenu.style.display = 'block'; // Show the menu
});


document.addEventListener('click', (e) => { if( e.target !== rightMenu && !rightMenu.contains(e.target)) { rightMenu.style.display = 'none';}});