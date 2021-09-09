
//REGULAR EXPRESION
const regEx = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    nombre: /^[a-zA-Z\ñ\Ñ\Á\É\Í\Ó\Ú\á\é\í\ó\ú\Ü\ü\s]{10,45}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
}


//VARIABLES
const btnEnviar = document.querySelector('#btn-send');
const groupForm = document.querySelector('#group-form');
const input = document.querySelectorAll('input');
const btnGetPrice = document.querySelector('.btn-getprice');

const email = document.querySelector('#email');
const fullName = document.querySelector('#name');
const password = document.querySelector('#password');
const terms = document.querySelector('#terms');


eventListener()
function eventListener(){

    //CHARGE THE APP UNTIL THE DOM CHARGE COMPLETLY
    document.addEventListener('DOMContentLoaded', startApp);
    groupForm.addEventListener('submit', showCorrectMessage);
}

//FUNCTION TO DISABLED BUTTON
function startApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('btn-desactive');
}

//VALIDATE THE FORM
function validateForm(e){
    //REMOVE THE ERRORMESSAGE
    const error = document.querySelector('p.error')
    if(error){
        error.remove();
    }
    //VALIDATE ALL THE INPUTS
    if(e.target.value.length > 0){
        e.target.classList.remove('form__incorrecto');
        e.target.classList.add('form__correcto');
    }else{
        e.target.classList.remove('form__correcto');
        e.target.classList.add('form__incorrecto');
        showErrorMessage('Todos los datos son obligatorios')
    }
    //VALIDATE THE INPUT WITH THEIR DATA TYPE
    if(e.target.type === 'email'){
        if(regEx.email.test(e.target.value)){
            e.target.classList.remove('from__incorrecto');
            e.target.classList.add('form__correcto');
        }else{
            e.target.classList.remove('form__correcto');
            e.target.classList.add('form__incorrecto');
            showErrorMessage('Enter your email correctly');
        }
    }
    if(e.target.type === 'text'){
        if(regEx.nombre.test(e.target.value)){
            e.target.classList.remove('from__incorrecto');
            e.target.classList.add('form__correcto');
        }else{
            e.target.classList.remove('form__correcto');
            e.target.classList.add('form__incorrecto');
            showErrorMessage('Enter your full name');
        }
    }
    if(e.target.type === 'password'){
        if(regEx.password.test(e.target.value)){
            e.target.classList.remove('form__incorrecto');
            e.target.classList.add('form__correcto');
        }else{
            e.target.classList.remove('form__correcto');
            e.target.classList.add('form__incorrecto');
            showErrorMessage('The password must be 8 characters, uppercase and lowercase, a nunmber and a symbol')
        }
    }

    if(regEx.email.test(email.value) && regEx.nombre.test(fullName.value) && regEx.password.test(password.value) && terms.checked){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('btn-desactive');
    }else{
        btnEnviar.disabled = true;
    }
}
//FUNCTION TO SHOW THE ERROR MESSAGE
function showErrorMessage(mensaje){
    const errorMessage = document.createElement('p');
    errorMessage.textContent = mensaje;
    errorMessage.classList.add('mensaje-error','error');
    //VERIFY IF EXISTS SOME ERRORMESSAGE, NO REPEAT AGAIN
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        groupForm.appendChild(errorMessage);
    }
}

input.forEach( inputs =>{
    inputs.addEventListener('blur', validateForm);
    inputs.addEventListener('keyup',validateForm);
})

//ADD THE SPINNER IN THE FORM
function showCorrectMessage(e){
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    setTimeout(() => {
        spinner.style.display = 'none';
        const correctMessage = document.createElement('p');
        correctMessage.textContent = 'El mensaje fue enviado correctamente';
        correctMessage.classList.add('mensaje-correcto','animate__backInRight');
        groupForm.insertBefore(correctMessage,spinner);
        setTimeout(() => {
            correctMessage.remove();
            resetForm()
        }, 2000);
    }, 3000);
}

//RESET THE FORM
function resetForm(){
    groupForm.reset();   
    startApp();
}