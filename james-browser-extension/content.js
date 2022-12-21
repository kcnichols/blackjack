console.log('loading js file ')



const b = document.createElement("button");

b.innerText = "Call James"

b.onclick = (event)=>{

  // chrome.storage.sync.get(['color'], function(result) {
  //   console.log('Value currently for color is: ' + result.color);
  // });
  chrome.runtime.sendMessage({command: "call", phone_nbr: "9418076677"}, function(response) {
  
      console.log('rrrrrr : ' + response.farewell);
 
  });

  // console.log('.....', chrome.storage.local.get(['color'], function(result){
  //   console.log('hmmm', result.color)
  // }));


}

document.body.appendChild(b);
