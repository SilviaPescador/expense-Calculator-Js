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

	añadeALista(movimiento);

	actualizaValores();

	actualizaLocalStorage();


	concepto.value = '';
	cantidad.value = '';
	
	}
})

function añadeALista(movimiento) {
	// DOM 
	const newElement = document.createElement('li')
	newElement.classList.add('ingreso-gasto')

	newElement.innerHTML = `
		${movimiento.concepto} 
		<span>${Number(movimiento.cantidad).toFixed(2)}€
		<button class="delete-button" onclick="borrarMovimiento(${movimiento.id})"><i class="bi bi-trash3"></i></button>
		</span>
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
	
	const totalIngresos = (cantidades.filter(cantidad => cantidad > 0)).reduce((acc, nuevoIngreso)=> acc + nuevoIngreso, 0).toFixed(2)
	ingreso.innerText = `${totalIngresos}€`

	const totalGastos = cantidades.filter(cantidad => cantidad < 0).reduce((acc, nuevoGasto)=> acc + nuevoGasto, 0).toFixed(2)
	gasto.innerText = `${totalGastos}€`

	const totalBalance = cantidades.reduce((acc, sig)=> acc + sig, 0).toFixed(2)
	balance.innerText = `${totalBalance}€`

}

function actualizaLocalStorage() {
	localStorage.setItem('movimientos', JSON.stringify(movimientos));	
}


function inicio() {
	// Resetea la lista + pinta movimientos actualizados + pinta valores actualizados.
	lista.innerHTML = ''
	movimientos.forEach(añadeALista)
	actualizaValores()
}



