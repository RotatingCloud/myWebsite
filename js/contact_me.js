const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.getElementById('body').style.color = '#ffffff';

function phoneNumberFormatter() {

    const inputField = document.getElementById('phone-number');
    const formattedInputValue = formatPhoneNumber(inputField.value);
    inputField.value = formattedInputValue;
}

function formatPhoneNumber(value) {

    if(!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if(phoneNumberLength < 4) return phoneNumber;
    if(phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6, 9)}`;

}

function sendEmail() {
    
    var params = {
        
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    }

    if(isEmptyOrSpaces(params.name)) {

        alert("youre not going to leave your name?");
        return false;
    
    } else if(isEmptyOrSpaces(params.email)) {

        alert("add an email so i can message you back!");
        return false;
    
    } else if(isEmptyOrSpaces(params.message)) {

        alert("say something funny");
        return false;
    }

    const serviceID = "service_yev9lpt";
    const templateID = "template_80f68u8";

    emailjs.send(serviceID, templateID, params)
        .then(
            res => {

                console.log(res);
                alert("message sent! :)");
            }
        )
        .catch((err) => console.log(err));

    
    return false;
}

function isEmptyOrSpaces(str){
    
    return str === null || str.match(/^ *$/) !== null;
}
