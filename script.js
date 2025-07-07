const screen = document.getElementById('screen')
const allButtons = document.getElementsByTagName('button')


let screenValue = document.createElement('p');
screenValue.classList.add("screen-value");
screenValue.innerText = "0" //valor por defecto
screen.append(screenValue)

// let screenValue.innerText = "0" //valor por defecto

//strings para que no haya problemas con el innerText
const options = ["0","1","2","3","4","5","6","7","8","9","−","+","÷","×",","]

// Mapping de teclas del teclado a los valores de los botones de la calculadora
const keyMap = {
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
    '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    '+': '+', '-': '−', '/': '÷', '*': '×',
    'Enter': '=',
    '=': '=', 
    'Escape': 'C',
    'Backspace': '←', 
    '.': ',', 
    ',': ','
};

//lógica de entrada (click y teclado)
function handleInput(value) {
    if (options.includes(value)) { // que los numeros ingresados existan en las posibilidades
        if (screenValue.innerText === "0" && value !== ",") {
            screenValue.innerText = value;
        } else if (value === "," && screenValue.innerText.includes(",")) {
            // No hacer nada si ya hay una coma
            return;
        } else { // si hay numeros ingresados se borra el cero para evitar por ejemplo 03
            screenValue.innerText += value;
        }
    } else { // si se presiona (= C <-)
        if (value == "=") {
            let expression = screenValue.innerText
                .replace(/÷/g, "/") // convierte los simbolos visuales de la calc a operadores reales
                .replace(/×/g, "*") // la "g" indica que se reemplazan todos los símbolos que haya
                .replace(/−/g, "-")
                .replace(/,/g, "."); // Reemplaza la coma por punto para math.js

            try { // interpreta la expresion que le llega
                const result = math.evaluate(expression);
                screenValue.innerText = result.toString(); // muestra el resultado en la pantalla
            } catch (error) {
                screenValue.innerText = "Error";
            }
        } else if (value == "C") {
            clearDisplay();
        } else if (value == "←") {
            deleteNumber();
        }
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key; // Obtiene la tecla presionada

    // Mapeo
    const mappedValue = keyMap[key];

    // Si la tecla está en el mapa
    if (mappedValue) {
        // Prevenir el comportamiento por defecto de algunas teclas (ej Enter)
        event.preventDefault();
        handleInput(mappedValue);
    } else if (key === 'Delete') { // Manejar la tecla "Delete" (Supr) como "C"
        handleInput('C');
    }
});

for(let index = 0; index < allButtons.length; index++) { //por cada boton crea un evento
    
    allButtons[index].addEventListener('click', () => {
        handleInput(allButtons[index].innerText);
    });
}   

const clearDisplay = () => {
    screenValue.innerText = "0";
};

const deleteNumber = () => {
    screenValue.innerText = screenValue.innerText.slice(0, -1); // borra el último número
    if (screenValue.innerText === "") screenValue.innerText = "0"; // si ya no hay más números, muestra el cero por defecto
};

