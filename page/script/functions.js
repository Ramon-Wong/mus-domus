


export function printMessage(){
	console.log("Hello from Module");
}


export function _CreateElement( element, div_id, div_class){
	
	element.id			= div_id;
	element.className	= div_class;
	return element;
}


export function _CreateForm( fields) {
	const form = document.createElement('form'); // Create the form

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
	submitButton.type			= 'submit';
	submitButton.textContent	= 'Login';

	form.appendChild(submitButton);

	return form;
}