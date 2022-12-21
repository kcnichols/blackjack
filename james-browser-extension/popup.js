// document.addEventListener("click", (event)=>{
//   console.log('cccccccccccc', event)
//   if (event.target.id === "login") {
//     chrome.runtime.sendMessage({command: "login" }, function(response) {
//       console.log('rrrrrr : ' + response.farewell);
//     });
//   } else {
//     chrome.runtime.sendMessage({command: "logout" }, function(response) {
//       console.log('rrrrrr : ' + response.farewell);
//     });
//   }
// });
 

const hideSpinner = () =>{
  document.getElementsByClassName("container")[0].classList.add("hidden");
}
const login = () =>{
  console.log('logging in ... started ');
  document.getElementsByClassName("loginButton")[0].innerHTML = "Please Wait";
  document.getElementsByClassName("loginButton")[0].removeEventListener("click", login );
}

const loginState = (showLogin = false) =>{
  if (showLogin) {
    document.getElementsByClassName("loginButton")[0].style.display = "block";
    document.getElementsByClassName("loginButton")[0].addEventListener("click", login );
  } else {
    document.getElementsByClassName("loginButton")[0].style.display = "none";
    document.getElementsByClassName("loginButton")[0].removeEventListener("click", login );
  }
  
}

window.onload = () => {
  console.log("initializing  ....")
  chrome.runtime.sendMessage({command: "state" }, function(response) {
    console.log('state.... : ' + response.state);
    switch(response.state) {
      case "logged_out":
        // hide spinner container
        hideSpinner();
        // add login button 
        loginState(true);

    }
  });
}


