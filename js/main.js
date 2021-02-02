// Variables
const imagenes = []
let pagina = 1;
const objetoImg = document.querySelector('#imagen');
const botonAvanzar = document.querySelector('#avanzar');
const botonRetroceder = document.querySelector('#retroceder');
const templateCirculo = document.querySelector('#template-circulo').content.firstElementChild;
const circulos = document.querySelector('#circulos');
const botonParar = document.querySelector('#parar');
const botonAutoplay = document.querySelector('#autoplay');
let intervalo = null;
const tiempoIntervaloSeg = 1;

// Funciones
function activarAutoplay () {
    // Si no existe
    if (intervalo === null) {
        // Intervalo = setInterval(avanzarFoto, tiempoIntervaloSeg * 1000
        intervalo = setInterval(function () {
            avanzarFoto();
        }, tiempoIntervaloSeg * 1000);
    }
}

function desactivarAutoplay () {
    clearInterval(intervalo);
    intervalo = null;
}

function cambiarPagina (nuevaPagina) {
    pagina = nuevaPagina;
    render();
}

function avanzarFoto () {
    pagina = pagina + 1;
    if (imagenes.lenght + 1 <= pagina) {
        pagina = 1;
    }
    render();
}

function retrocederFoto () {
    pagina = pagina - 1;
    if (0 === pagina) {
        pagina = imagenes.lenght;
    }
    render();
}

function render () {
    // Imagen
    objetoImg.setAttribute('src', imagenes[pagina - 1]);
    // Borramos los circulitos
    circulos.textContent = '';
    // Creamos todos los circulitos
    imagenes.forEach(function (imagen, indice) {
        // Creamos
        const nuevoCirculo = templateCirculo.cloneNode(true);
        // Anyadimos evento
        nuevoCirculo.addEventListener('click', function () {
            cambiarPagina(indice + 1);
        });
        // Marcamos el que coindice con la pagina
        if (pagina === indice + 1) {
            nuevoCirculo.setAttribute('checked', true);
        }
        // Mostramos
        circulos.appendChild(nuevoCirculo);
    });
}


// Evento
botonAvanzar.addEventListener('click', avanzarFoto);
botonRetroceder.addEventListener('click', retrocederFoto);
botonAutoplay.addEventListener('click', activarAutoplay);
botonParar.addEventListener('click', desactivarAutoplay);


// Inicio
render();