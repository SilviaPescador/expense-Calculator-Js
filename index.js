const concepto = document.getElementById("concepto")
const cantidad = document.getElementById("cantidad")
const form = document.getElementById("form-entradas")
const ingreso = document.getElementById("ingreso")
const gasto = document.getElementById("gasto")
const balance = document.getElementById("balance")
const lista = document.getElementById("lista")

let movimientos = JSON.parse(localStorage.getItem('movimientos')) ?? []



inicio()

form.addEventListener("submit", (event) => {
	event.preventDefault();
	 

	if (concepto.value  === ''|| cantidad.value === '') {
		alert('Introduce concepto y cantidad')
	} else { const movimiento = {
			concepto: concepto.value,
			cantidad: cantidad.value,
			id: Math.floor(Math.random() * 100000000),
		}


	movimientos.push(movimiento);

	añadirAlHistorial(movimiento);

	actualizaValores();

	actualizaLocalStorage();


	concepto.value = '';
	cantidad.value = '';
	
	}
})

function añadirAlHistorial(movimiento) {
	//DOM 
	const newElement = document.createElement('li')
	newElement.classList.add('ingreso-gasto')

	newElement.innerHTML = `
		${movimiento.concepto} <span>${movimiento.cantidad}€
		<button class="delete-button" onclick="borrarMovimiento(${movimiento.id})">🗑️</button></span>
	`
	lista.appendChild(newElement)
}

function borrarMovimiento(id) {
	
	movimientos = movimientos.filter(movimiento => id !== movimiento.id )

	actualizaLocalStorage()
	inicio()
}

function actualizaValores() {

	const cantidades = movimientos.map(movimiento => Number(movimiento.cantidad))
	
	const totalIngresos = (cantidades.filter(cantidad => cantidad > 0)).reduce((acc, ing)=> acc + ing, 0)
	ingreso.innerText = `${totalIngresos}€`

	const totalGastos = cantidades.filter(cantidad => cantidad < 0).reduce((acc, gasto)=> acc + gasto, 0)
	gasto.innerText = `${totalGastos}€`

	const totalBalance = cantidades.reduce((acc, sig)=> acc + sig, 0)
	balance.innerText = `${totalBalance}€`

}

function actualizaLocalStorage() {

	localStorage.setItem('movimientos', JSON.stringify(movimientos));	
}


function inicio() {
	
	lista.innerHTML = ''
	movimientos.forEach(añadirAlHistorial)
	actualizaValores()
}



