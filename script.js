const screen = document.getElementById('screen')
const allButons = document.getElementsByTagName('button')

let screenValue = document.createElement('p');
screenValue.classList.add("screen-value");
screenValue.innerText = "0" //valor por defecto
screen.append(screenValue)

// let screenValue.innerText = "0" //valor por defecto

//strings para que no haya problemas con el innerText
const options = ["0","1","2","3","4","5","6","7","8","9","−","+","÷","×",","]

for(let index = 0; index < allButons.length; index++) { //por cada boton crea un evento
    allButons[index].addEventListener('click',()=>{
        let currentValue = allButons[index].innerText //valor del elemento que se hizo click

       if (options.includes(currentValue)) {     //que los numeros ingresados existan en las posibilidades

            if (screenValue.innerText === "0") { //si no hay numeros ingresados se muestra cero
                screenValue.innerText = currentValue;
            } else { //si hay numeros ingresados se borra el cero para evitar por ejemplo 03
                screenValue.innerText += currentValue;
            }    
            
        }else { //si se presiona (=  C <-)
            if(currentValue == "="){
                let expression = screenValue.innerText
                .replace(/÷/g, "/") //convierte los simbolos visuales de la calc a operadores reales
                .replace(/×/g, "*") //la "g" indica que se reemplazan todos los símbolos que haya
                .replace(/−/g, "-")
                .replace(/,/g, ".")

                try {   //interpreta la expresion que le llega
                    const result = math.evaluate(expression);
                    screenValue.innerText = result; //muestra el resultado en la pantalla
                } catch (error) {
                    screenValue.innerText = "Error";
                }

            }else if(currentValue == "C"){
                clearDisplay()
            }else{ // <-
                deleteNumber()
            }
        }

    })
}   

const clearDisplay = () => {
    screenValue.innerText = "0";
};

const deleteNumber = () => {
    screenValue.innerText = screenValue.innerText.slice(0, -1); // borra el último número
    if (screenValue.innerText === "") screenValue.innerText = "0"; // si ya no hay más números, muestra el cero por defecto
};

