//Registration Form - Username Validation:

function validateUsername(username){
    username = username.trim();

    //The username cannot be blank.
    if(username === ""){
        return "Username cannot be blank"
    }

    //The username must be at least four characters long.
    if(username.length < 4){
        return "Username must be at least four characters long"
    }

    //The username cannot contain any special characters or whitespace.
    const usernamePattern = /^[a-zA-z0-9] + $/;
    if(!usernamePattern) {
        return "Username cannot contain only special charcters or whitespace"
    }

    //The username must contain at least two unique characters.
    const uniqChar = new Set(username)
    if(uniqChar < 2){
        return "Username must contain at least 2 characters"
    }

    return null;
}

document.getElementById("registration").addEventListener("submit", function(e){
    e.preventDefault()

    const username = document.querySelector("input[name='username']").value;

    const usernameError = validateUsername(username);

    if(usernameError) {
        document.getElementById("errorDisplay").innerText = usernameError;
        document.querySelector("input[name='username']").focus()
        return;
    }
})

//Registration Form - Email Validation:

function validateEmail(email){
    email = email.trim()

    //The email must be a valid email address.
    if(email === ""){
        return "Email cannot be blank"
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
    if(!emailPattern.test(email)){
        return "Please enter a vl;id email address"
    }

    //The email must not be from the domain "example.com."
    const emailDomain = email.split('@')[1];
    if(emailDomain === 'example.com'){
        return "Email cannot be from the 'example.com'."
    }

    return null;
}

document.getElementById("registration").addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.querySelector("input[name='username']").value;

    const email = document.querySelector("input[name='email']").value;

    const usernameError = validateUsername(username)

    if(usernameError){
        document.getElementById("errorDisplay").innerText = usernameError;
        document.querySelector("input[name='username']").focus();

        const emailError = validateEmail(email)
        if(emailError) {
            document.getElementById("errorDisplay").innerText = emailError;
            document.querySelector("input[name='email']").focus();
            return;
        }
    }
})

function validatePassword(password, username){
    password = password.trim();

    if(password.length < 12){
        return "Password must be at least 12 characters long"
    }

    const uppercasePattern = /[A-Z]/
    const lowerercasePattern = /[a-z]/
    const numberPattern = /\d/
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>|]/

    if(!uppercasePattern.test(password) ||
        !lowerercasePattern.test(password) ||
        !numberPattern.test(password) ||
        !specialCharPattern.test(password)){
        return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }

    const lowerCasePassword = password.toLowerCase();
    if(lowerCasePassword.includes("password")){
        return "Passwod cannot contain the word 'password'."
    }

    if(password.toLowerCase().includes(username.toLowerCase())){
        return "Password cannot contain username."
    }

    return null;
}

document.getElementById("registration").addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.querySelector("input[name='username']").value;
    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const passwordCheck = document.querySelector("input[name='passwordCheck']").value;

    const usernameError = validateUsername(username);
    if(usernameError) {
        document.getElementById("errorDisplay").innerText = usernameError;
        document.querySelector("input[name='username']").focus();
    }

    const emailError = validateUsername(email);
    if(emailError) {
        document.getElementById("errorDisplay").innerText = usernameError;
        document.querySelector("input[name='email']").focus();
    }

    const passwordError = validateUsername(password);
    if(passwordError) {
        document.getElementById("errorDisplay").innerText = usernameError;
        document.querySelector("input[name='password']").focus();
    }

    if(password !== passwordCheck){
        document.getElementById("errorDisplay").innerText = usernameError;
        document.querySelector("input[name='passwordCheck']").focus();
    }
    storeUserData(username, email, password)
})

function storeUserData(username, email, passwpord){
    let users = JSON.parse(localStorage.getItem.apply("users")) || [];

    const user = {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: password
    };

    if(users.some(user => user.username === username.toLowerCase())){
        document.getElementById("errorDisplay").innerText = "Username is already taken."
        document.querySelector("input[name='username']").focus()
        return;
    }

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("registration").reset();

    document.getElementById("errorDisplay").innerText = "Registration successful!"
}
