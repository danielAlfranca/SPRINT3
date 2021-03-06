// Exercise 6

const inputsStates = {

    Name: false,
    Email: false,
    Address: false,
    LastN: false,
    Password: false,
    Phone: false
}

function validate(showAlert) {

    event.preventDefault();

    var error = 0,
        input,
        valid;

    // Get the input fields

    ['Name', 'Email', 'Address', 'LastN', 'Password', 'Phone'].forEach(tag => {

        input = document.getElementById('f' + tag);

        valid = checkValidityInput(tag, input.value);

        if (isDirty(tag) || showAlert) setValidityInput(input, valid);

        error += Number(!valid);
    })

    if (showAlert) {

        if (error > 0) {
            alert("Error");
        } else {
            alert("OK");
        }
    }

}

function checkValidityInput(inputName, value) {

    let is_valid = true;

    switch (inputName) {

        case 'Name':
        case 'LastN':
            is_valid = /^[a-zA-Z]+$/.test(value);
            break;
        case 'Phone':
            is_valid = /^\d+$/.test(value);
            break;
        case 'Password':
            is_valid = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/.test(value);
            break;
        case 'Email':
            is_valid = value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            break;
    }

    return is_valid && ('' + value.length) > 2;
}

function setValidityInput(input, is_valid) {

    let classes = ['is-invalid', 'is-valid'];

    input.classList.add(classes[Number(is_valid)]);

    input.classList.remove(classes[Number(!is_valid)]);
}

function setDirty(inputName) {
    console.log(inputName);
    inputsStates[inputName] = true;

}

function isDirty(inputName) {

    return inputsStates[inputName]
}