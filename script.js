const screenValue = document.getElementById('screen')
const addButon = document.getElementById('add')
const allButons = document.getElementsByTagName('button')

screenValue.innerText = "0" //valor por defecto

//strings para que no haya problemas con el innerText
const options = ["0","1","2","3","4","5","6","7","8","9","−","+","÷","⨯",","]

for(let index = 0; index < allButons.length; index++) {
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
                console.log("mostrar resultado")
            }else if(currentValue == "C"){
                clearDisplay()
            }else{ // <-
                deleteNumber()
            }
        }

    })
}   




function clearDisplay() {
    screenValue.innerText = ""
}

function deleteNumber() {
    console.log("borrar el ultimo numero")
}

function add(a,b) {
    return a+b
}

function subract(a,b) {
    return a-b
 }

function multiply(a,b) {
    return a * b
 }

function divide(a,b) {
    return a / b
}
