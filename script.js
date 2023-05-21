
const inputSlider = document.querySelector("[data-lenghtSlider");
const lengthDisplay = document.querySelector("#data-lengthNumber");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy");
const copymsg = document.querySelector("[data-copyMsg");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn")
const allCheckBox = document.querySelectorAll("input[type=checkbox] ");

let symbol = "!@#$%^&*()_+{}/?<>~\|"

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");
// strenght circle colour grey

//set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength -min) *100/(max-min)) + "% 100%"
};

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function  getRandInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRandInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandInteger(65,91));
}

function generateSymbol(){
    const randsym  = getRandInteger(0, symbol.length);
    return symbol.charAt(randsym);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) haslower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    // try{
    //     await navigator.clipboard.writeText(passwordDisplay.value);
    //     copymsg.innerText = "Copied";
    // }
    // catch(e){
    //     copymsg.innerText = "Failed";
    // }

    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerText = "copied";
    }
    catch(e) {
        copymsg.innerText = "Failed";
    }

    copymsg.classList.add("active");

    setTimeout( () => { 
        copymsg.classList.remove("active");
    }, 2000);
}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

copybtn.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
});


function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});


function shufflepassword(){

}


generateBtn.addEventListener('click', () => {
      
    if(checkCount <= 0) return;

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    
    password = "";

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generatelowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolCheck.checked){
    //     password += generateSymbol();
    // }

    let funArr = [];
    if(uppercaseCheck.checked){
        funArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funArr.push(generateRandomNumber);
    }
    if(symbolCheck.checked){
        funArr.push(generateSymbol);
    }

    for( let i=0; i<funArr.length; i++){
        password+=funArr[i]();
    }


    for (let i=0; i<passwordLength-funArr.length; i++){
        let randidx = getRandInteger(0, funArr.length);
        password += funArr[randidx]();
    }
     
    passwordDisplay.value = password;
    calcStrength();

});
    