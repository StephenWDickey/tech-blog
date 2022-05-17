

async function loginFormHandler(event) {

    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    
    const password = document.querySelector('#password-login').value.trim();

    
  
    if (username && password) {
      const response = await fetch( 'http://localhost:3001/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  
document.querySelector('.login-btn').addEventListener('click', loginFormHandler);



async function signupFormHandler(event) {

    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();

    

    const password = document.querySelector('#password-signup').value.trim();


    //if we have username and password values
    //then we create a POST request for users endpoint
    //we create a new USER
    if (username && password) {
        // we assign await function to a variable, so we do not have to chain .then methods to fetch
        const response = await fetch('http://localhost:3001/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            
            document.location.replace('/dashboard');
            
        } else {
            alert(response.statusText);
        };
    }
}

document.querySelector('.signup-btn').addEventListener('click', signupFormHandler);


