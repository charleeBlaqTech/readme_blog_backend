
// Validators middleware functions......... 

function validateUserInputsForSignUp(req, res, next) {
  const errors = [];
  if (!req.body) {
    res.json('request body cannot be empty.......')
  } else {
    //sanitizing the req.body form datas to validate
    const sanitizedData = {
      email:              req.body.email ? req.body.email.trim().toLowerCase() : '',
      password:           req.body.password ? req.body.password.trim() : '',
      confirmedPassword:  req.body.confirmedPassword ? req.body.confirmedPassword.trim() : '',

    };


    if (!sanitizedData.email || typeof sanitizedData.email !== 'string') {
      errors.push('Invalid email');
    } else {
      if (!emailIsValid(sanitizedData.email)) {
        errors.push('Enter a valid email address');
      };
    }

    if (!sanitizedData.password || typeof sanitizedData.password !== 'string' || sanitizedData.password.length < 8) {
      errors.push('Invalid password and Password should be at least 8 characters');
    } else {
      if (!hasSpecialCharacter(sanitizedData.password)) {
        errors.push('Password should contain at least one special character');
      };

      if (!hasUppercaseLetter(sanitizedData.password)) {
        errors.push('Password should contain at least one uppercase letter');
      };
    };


    if (!sanitizedData.confirmedPassword || typeof sanitizedData.confirmedPassword !== 'string' || sanitizedData.confirmedPassword.length < 8) {
      errors.push('Invalid password and Password should be at least 8 characters');
    } else {
      if (!hasSpecialCharacter(sanitizedData.confirmedPassword)) {
        errors.push('Password should contain at least one special character');
      };


      if (!hasUppercaseLetter(sanitizedData.confirmedPassword)) {
        errors.push('Password should contain at least one uppercase letter');
      };
    };

    if (!errors.length) {
      req.body = sanitizedData;
      next()
    } else {
      res.status(400).json({ errors })
    }

  }



}


function validateUserInputsForSignIn(req, res, next) {
  const errors = [];
  
  //sanitizing the req.body form datas to validate
    const sanitizedData = {
      email: req.body.email ? req.body.email.trim().toLowerCase() : '',
      password: req.body.password ? req.body.password.trim() : '',
      confirmedPassword: req.body.confirmedPassword ? req.body.confirmedPassword.trim() : '',

    };


  if (!sanitizedData.email || typeof sanitizedData.email !== 'string') {
    errors.push('Invalid email');
  }else{
    if (!emailIsValid(sanitizedData.email)) {
        errors.push('Enter a valid email address');
    };
  }

  if (!sanitizedData.password || typeof sanitizedData.password !== 'string' || sanitizedData.password.length < 8) {
    errors.push('invalid password and Password should be at least 8 characters');
  } else {
    if (!hasSpecialCharacter(sanitizedData.password)) {
      errors.push('Password should contain at least one special character');
    };

    if (!hasUppercaseLetter(sanitizedData.password)) {
      errors.push('Password should contain at least one uppercase letter');
    };
  };

   if (!errors.length) {
      req.body = sanitizedData;
      next();
    } else {
      res.status(400).json({ errors })
    }
}


function comparePassword(req, res, next) {
  const errors = [];
   if(req.body.password === req.body.confirmedPassword){
    next()
   }else{
    errors.push('Passwords not match');
    res.status(400).json({errors})
   }

}


function inputAreAllNumbers(password) {
  const phoneAreNumbers = /[0-9]/;
  return phoneAreNumbers.test(password);
}


// Check if the password contains at least one special character
function hasSpecialCharacter(password) {
  const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  return specialChars.test(password);//note that the .text method return boolean value true or false
}

// Check if the password contains at least one uppercase letter
function hasUppercaseLetter(password) {
  const uppercaseChars = /[A-Z]/;
  return uppercaseChars.test(password);//note that the .text method return boolean value true or false
}

// Check if the email contains the valid character
function emailIsValid(email) {
  const emailChars = /[@.com]/;
  return emailChars.test(email);//note that the .text method return boolean value true or false
}




module.exports = {
  validateUserInputsForSignUp,
  validateUserInputsForSignIn,
  comparePassword
}