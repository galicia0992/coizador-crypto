const formulario = document.querySelector("#formulario")
const moneda = document.querySelector("#moneda")
const criptomonedas = document.querySelector("#criptomonedas")
const resultado = document.querySelector("#resultado")

const objBusqueda = {
    moneda: "",
    criptomoneda: ""
}

const obtenerCriptomonedas = criptomoneda => new Promise(resolve =>{
        resolve(criptomoneda)
    })


const key = "607e799ef31837e9c7a1212fbdcd2f9bb0cffd5da901d4ab73f06ba327555ac8"
const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

document.addEventListener("DOMContentLoaded", () =>{
    consultarCriptomonedas()
    formulario.addEventListener("submit", submitFormulario)
    criptomonedas.addEventListener("change", leerValor)
    moneda.addEventListener("change", leerMoneda)

})


function consultarCriptomonedas(){
    fetch(url)
.then(response => {
    return response.json()
})
.then(data =>{
    return obtenerCriptomonedas(data.Data)
})
.then(criptomoneda =>{
    selectCriptomonedas(criptomoneda)
})
}

function selectCriptomonedas(criptomoneda){
    criptomoneda.forEach(item =>{
        console.log(item)
        const {FullName, Name} = item.CoinInfo
        const option = document.createElement("option")
        option.value = Name
        option.innerHTML = FullName
        criptomonedas.appendChild(option)
    })
    
}

function leerValor(e){
                //criptomoneda
    objBusqueda[e.target.name] = e.target.value
    console.log(objBusqueda)
}

function leerMoneda(e){
    objBusqueda[e.target.name] = e.target.value
    console.log(objBusqueda)
}

function submitFormulario(e){
    e.preventDefault()
    const {moneda, criptomoneda} = objBusqueda

    if(moneda == "" || criptomoneda == ""){
        mostrarAlerta("ambos campos son obligatorios")
        return
    }
    consultarApi()
}
function mostrarAlerta(mensaje){
    const existeError = document.querySelector(".error")
    const divMensaje = document.createElement("div")
    
    if(!existeError){
        
        divMensaje.classList.add("error")

        divMensaje.innerHTML = mensaje


        formulario.appendChild(divMensaje)
    }
    setTimeout(() => {
        divMensaje.remove()
    }, 3000);

}

function consultarApi(){
    const {moneda, criptomoneda} = objBusqueda
    mostrarSpinner()
    const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    fetch(url)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        return mostrarCotizacionHtml(data.DISPLAY[criptomoneda][moneda])
    })

}

function mostrarCotizacionHtml(a){
    limpiaHTML()
    console.log(a)
     const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = a
     const precio = document.createElement("p")
     precio.classList.add("precio")
     precio.innerHTML = `el precio es: <span>${PRICE}</span>`

     const alto = document.createElement("p")
     alto.innerHTML = `<p>Su precio mas alto fue: <span>${HIGHDAY}</span>`

     const bajo = document.createElement("p")
     bajo.innerHTML = `<p>Su precio mas bajo fue: <span>${LOWDAY}</span>`

     const change24 = document.createElement("p")
     change24.innerHTML = `<p>Su cambio en el precio durante las ultimas 24 horas fue: <span>${CHANGEPCT24HOUR}%</span>`

     const ultimaActualizacion = document.createElement("p")
     ultimaActualizacion.innerHTML = `<p>Su ultima actualizacion: <span>${LASTUPDATE}</span>`
     

    resultado.appendChild(precio)
    resultado.appendChild(alto)
    resultado.appendChild(bajo)
    resultado.appendChild(change24)
    resultado.appendChild(ultimaActualizacion)

}
function limpiaHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function mostrarSpinner(){
    limpiaHTML()
    const spinner = document.createElement("div")
    
    spinner.innerHTML = `
    <div class="spinner">
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
</div>`
resultado.appendChild(spinner)
}

