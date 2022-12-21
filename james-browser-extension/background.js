

// chrome.runtime.onInstalled.addListener(function() {
//   const v = '#3aa757';
//   chrome.storage.sync.set({color: v}, function() {
//     console.log("The color is " + v );
//     chrome.storage.sync.get(['color'], function(result) {
//       console.log('Value currently is ' + result.color);
//     });
//   });
// });

// OnClicked event for extension icon

// chrome.browserAction.onClicked.addListener( (tab)=> {
//   console.log('...........')
//   chrome.storage.local.get('signed_in', function(data) {
//     console.log('xxxxxx' + JSON.stringify(data))
//     if (data.signed_in) {
//       chrome.browserAction.setPopup({popup: 'popup.html'});
//     } else {
//       chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
//     }
 
//   });    
 
// });



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('bbbbbb', JSON.stringify(request) );
 
    if (request.command == "call") {
      // check login state  

      // check confirmation state 
      if (window.confirm(`Do you want to call ${request.phone_nbr}`)) {
        sendResponse({farewell: "calling " + request.phone_nbr});
      } else {
        sendResponse({farewell: "cancel"});
      }
      
      
    } else if (request.command === "login") {
      chrome.storage.local.set({signed_in: true}, ()=> {
        console.log('signed in');
        chrome.browserAction.setPopup({popup: 'popup.html'});
      });
      sendResponse({farewell: "login"});
    }else if (request.command === "logout") {
      chrome.storage.local.remove("signed_in", ()=> {
        console.log('signed out ... logout');
        chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
      });
      sendResponse({farewell: "login"});
    } else if (request.command === "state") {
      sendResponse({state: "logged_out"}); 
    }
      
  }
);

function backgroundFunction() {
  alert('Background, reporting for duty!')
}