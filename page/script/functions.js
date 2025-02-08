


export function printMessage(){
	console.log("Hello from Module");
}


export function _CreateElement( element, div_id, div_class){
	
	element.id			= div_id;
	element.className	= div_class;
	return element;
}