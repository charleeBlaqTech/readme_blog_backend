
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
      fullname:           req.body.fullname ? req.body.fullname.trim().toLowerCase() : '',
      username:           req.body.username ? req.body.username.trim().toLowerCase() : '',

    };


    if (!sanitizedData.email || typeof sanitizedData.email !== 'string') {
      errors.push('Invalid email');
    } else {
      if (!emailIsValid(sanitizedData.email)) {
        errors.push('Enter a valid email address');
      };
    }


    if (!sanitizedData.fullname || typeof sanitizedData.fullname !== 'string') {
      errors.push('Invalid Fullname');
    } 


    if (!sanitizedData.username || typeof sanitizedData.username !== 'string') {
      errors.push('Invalid Username');
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
      email:      req.body.email ? req.body.email.trim().toLowerCase() : '',
      password:   req.body.password ? req.body.password.trim() : '',

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


function validateUrlQuery(req, res, next){
  const errors = [];
  const sanitizedData = {
    query: req.query?.query ? req.query.query.trim() : '',
  };



  if (!sanitizedData.query || typeof sanitizedData.query !== 'string') {
    errors.push('Invalid Search Term');
  }else{
    if (hasSomeUnwantedQueryCharacters(sanitizedData.query)) {
      errors.push('Invalid Search Term');
    };
  };


    if(errors.length){
      res.status(400).json({message: errors[0]})
    }else{
      req.query = sanitizedData;
      next();
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

function validatePostFormInputs(req, res, next) {
  const errors = [];
  if (!req.body) {
    res.json('request body cannot be empty.......')
  } else {
    //sanitizing the req.body form datas to validate
    const sanitizedData = {
      title:            req.body.title ? req.body.title.trim().toLowerCase() : '',
      description:      req.body.description ? req.body.description.trim() : '',
      category:         req.body.category ? req.body.category.trim().toLowerCase() : '',
      image:            req.body.image ? req.body.image.trim() : ''
    };


    if (!sanitizedData.title || typeof sanitizedData.title !== 'string') {
      errors.push('Invalid Title Input');
    } 


    if (!sanitizedData.description || typeof sanitizedData.description !== 'string') {
      errors.push('Invalid Description Input');
    } 


    if (!sanitizedData.category || typeof sanitizedData.category !== 'string') {
      errors.push('Invalid Category Input');
    } 

    if (!sanitizedData.image || typeof sanitizedData.image !== 'string') {
      errors.push('Invalid Image Input');
    } 


    

    if (!errors.length) {
      req.body = sanitizedData;
      next()
    } else {
      res.status(400).json({ errors })
    }

  }



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


// Check if the parameters contains <script></script> or some other characters that are not used for query concat...
function hasSomeUnwantedQueryCharacters(param) {
  const specialChars = /[<>!#$%^*()_[\]{};|<>]/;
  return specialChars.test(param); //note that the .text method return boolean value true or false
}


//HELPS TO CONVERT FIRST LETTER OF STRING TO UPERCASE
function capitalize (str){
  return str.replace(/\b\w/g, match=>match.toUpperCase());

}





module.exports = {
  validateUserInputsForSignUp,
  validateUserInputsForSignIn,
  validatePostFormInputs,
  comparePassword,
  validateUrlQuery,
  capitalize 
}