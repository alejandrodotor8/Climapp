const container = document.querySelector('#main');
const resultado = document.querySelector('#city_weather_answer');
const Form = document.querySelector('#form');

window.addEventListener('load', () => {
	Form.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
	e.preventDefault();

	//Validar Form
	const ciudad = document.querySelector('#input_ciudad').value;

	if (ciudad === '') {
		//ERROR
		mostarError('Esta Campo es obligatorio');
		return;
	}
	// Consular API
	consultarAPI(ciudad);
}

function mostarError(mensaje) {
	const alerta = document.querySelector('.form_error');
	if (!alerta) {
		//Crear Alerta HTML
		const alerta = document.createElement('div');

		alerta.classList.add('form_error');
		alerta.innerHTML = `<span>${mensaje}</span>`;
		container.appendChild(alerta);

		//Eliminar despues de 3seg
		setTimeout(() => {
			alerta.remove();
		}, 3000);
	}
}

function consultarAPI(ciudad) {
	const APIkey = '192c7a67ce6dc2ac98616d8c8246caa5';

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${APIkey}`;
	console.log(url);
	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((datos) => {
			if (datos.cod === '404') {
				limpiarHTML();

				mostarError('Ciudad no encontrada');
				return;
			}
			//imprime la respuesta en HTML
			mostarClima(datos);
		});
}

function myFunction() {
	let d = new Date();
	let x = document.getElementById('demo');
	let h = addZero(d.getHours());
	let m = addZero(d.getMinutes());
	x.innerHTML = h + ':' + m;
}
function mostarClima(datos) {
	const {
		main: { temp },
		sys: { country },
	} = datos;

	const centigrados = parseInt(temp - 273.15);

	let d = new Date();

	let h = d.getHours();
	let m = d.getMinutes();

	const days = [
		'Domingo',
		'Lunes',
		'Martes',
		'Miercoles',
		'Jueves',
		'Viernes',
		'Sabado',
	];
	let dayName = days[d.getDay()];

	const months = [
		'Ene',
		'Feb',
		'Mat',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	let monthName = months[d.getMonth()];

	let numberDay = d.getDate();

	resultado.innerHTML = `
         <span>${centigrados}º</span>
         <div>
            <h3>${datos.name} (${country})</h3>
            <p>${h + ':' + m}-${dayName}, ${numberDay} ${monthName}</p>
         </div>
         <figure>
            <img
               src="./img/noun_weather_2054801.svg"
               alt="Esta es una imagen que representa el clima actal"
            />
         </figure>
   `;
}

function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}
