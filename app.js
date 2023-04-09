let yearInput= document.querySelector("#year-input")
let monthInput = document.querySelector("#month-input")
let dayInput= document.querySelector("#day-input")

let yearDisplay = document.querySelector("#year-output")
let monthDisplay = document.querySelector("#month-output")
let dayDisplay = document.querySelector("#day-output")

let dayInputErrorDisplay = document.querySelector("#day-input-error")
let monthInputErrorDisplay = document.querySelector("#month-input-error")
let yearInputErrorDisplay = document.querySelector("#year-input-error")


let imgButton = document.querySelector("#img-button")


function clearErrorMessages(){
    let userInputs = document.querySelectorAll(".date-input")
    let errorMessages = document.querySelectorAll(".input-error-message")
    setLabelColors("hsl(0, 1%, 44%)")
    userInputs.forEach(inputEl => inputEl.style.border = "none")
    
    errorMessages.forEach(msg => {
        msg.textContent = ""
    })
}

function setLabelColor(labelType,newColor){

    let label;

    switch(labelType){
        case "year":
            label = document.querySelector(".year-form-group label")
            label.style.color = newColor;
            break;
        case "month":
            label = document.querySelector(".month-form-group label")
            label.style.color = newColor;
            break;
        case "day":
            label = document.querySelector(".day-form-group label")
            label.style.color = newColor;
            break;
    }
}

function setLabelColors(newColor){
    let labels = document.querySelectorAll('.form-group label')
    labels.forEach(label => {
        label.style.color = newColor
    })
}

function validateInput(userVal,inputEl,errorDisplay, dateType){
    if(userVal === null || isNaN(userVal)){
        inputEl.style.border = "thin solid red"
        setLabelColor(dateType,"red")
        errorDisplay.textContent = `Enter a valid ${dateType}`
        return false;
    }

    return true;
}

function validateYear(yearVal){
     if(!(yearVal <= (new Date()).getFullYear())){
        setLabelColor("year","red")
        yearInputErrorDisplay.textContent = "Year must be less than current year"
        return false;
     }

     return true;
}

function validateMonth(monthVal){
    if(!(monthVal >= 1 && monthVal <= 12)){
        setLabelColor("month","red")
        monthInputErrorDisplay.textContent = "Month must be in range 1-12"
        return false;
    }

    return true;
}

function validateDay(dayVal){
    if(!(dayVal >= 1 && dayVal <= 32)){
        setLabelColor("day","red")
        dayInputErrorDisplay.textContent = "Day must be in range 1-32"
        return false
    }
    return true
}

function animateOutputText(yearDiff,monthDiff,dayDiff){
    
    setTimeout(() => {
        
        animateText(yearDisplay,yearDiff,0);

        setTimeout(() => {
            animateText(monthDisplay,monthDiff,0)
            
            setTimeout(() => {
                
                animateText(dayDisplay,dayDiff,0)
            
            },500)
        }, 500)
    },500)

   
  
}

function validateYMD(yearVal,monthVal,dayVal){
    if(!validateYear(yearVal) &&
        !validateMonth(monthVal) &&
        !validateDay(dayVal)
    
    ) {return false} else if(
        !validateYear(yearVal) &&
        !validateMonth(monthVal)
    ) {return false } else if(
        !validateYear(yearVal) &&
        !validateDay(dayVal)
    ) {return false } else if(
        !validateMonth(monthVal) &&
        !validateDay(dayVal)
    ) {return false} else if(
        !validateYear(yearVal))
    { return false } 
    else if(
        !validateMonth(monthVal)){ return false} 
    else if(
        !validateDay(dayVal)){ return false } 

    return true;
}

function processUserDateInformation(){
    let yearVal = parseInt(yearInput.value);
    let monthVal = parseInt(monthInput.value);
    let dayVal = parseInt(dayInput.value);

    clearErrorMessages();

    if(
        !validateInput(yearVal,
            yearInput,
            yearInputErrorDisplay,"year") && 
        !validateInput(
            monthVal,
            monthInput,
            monthInputErrorDisplay,"month") && 
        !validateInput(
            dayVal,
            dayInput,
            dayInputErrorDisplay,"day")){
        return false;
    }

    if(!validateInput(yearVal,yearInput,yearInputErrorDisplay,"year") && !validateInput(monthVal,monthInput,monthInputErrorDisplay,"month")){
        
        if(!validateDay(dayVal)){
            return;
        }

        return;
    }

    if(!validateInput(yearVal,yearInput,yearInputErrorDisplay,"year") && !validateInput(dayVal,dayInput,dayInputErrorDisplay,"day")){
        
        if(!validateMonth(monthVal)){
            return;
        }

        return;
    }

    if(!validateInput(monthVal,monthInput,monthInputErrorDisplay,"month") && !validateInput(dayVal,dayInput,dayInputErrorDisplay,"day")){
        
        if(!validateYear(yearVal)){
            return;
        }

        return;
    }


    if(!validateInput(yearVal,yearInput,yearInputErrorDisplay,"year")){
        
        if(!validateMonth(monthVal) && !validateDay(dayVal)){
            return;
        } else if(!validateMonth(monthVal)){
            return;
        } else if(!validateDay(dayVal)){
            return;
        }

        return;
    }

   

    //Only month is invalid
    if(!validateInput(monthVal,monthInput,monthInputErrorDisplay,"month")){
        
        if(!validateYear(yearVal) && !validateDay(dayVal)){
            return;
        } else if(!validateYear(yearVal)){
            return;
        } else if(!validateDay(dayVal)){
            return;
        }
        return;
    }

   

    if(!validateInput(dayVal,dayInput,dayInputErrorDisplay,"day")){
        if(!validateYear(yearVal) && !validateMonth(monthVal)){
            return;
        } else if(!validateYear(yearVal)){
            return;
        } else if(!validateMonth(monthVal)){
            return;
        }
        return;
    }

    if(!validateYMD(yearVal,monthVal,dayVal)){
        return;
    }

    clearErrorMessages();

    let currentDate = new Date();
    let birthDate = new Date(yearVal, monthVal-1, dayVal);
    let diff = new Date(currentDate - birthDate)
    
   animateOutputText(currentDate.getFullYear() - birthDate.getFullYear(),diff.getMonth(),diff.getDate())

   
}


function animateText(textOutput, finalVal, currentVal = 0){
    textOutput.textContent = currentVal
    if(currentVal < finalVal){
        setTimeout(() => {
            animateText(textOutput,finalVal,currentVal+1)
        },10)
    }

}

imgButton.onclick = processUserDateInformation;
