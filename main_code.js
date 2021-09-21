//quora

const quoraUrlPart= 'quora';
let savedQuoraUrl= '';
var startListeningForUpdatesForCreatedTab= false;
let currentCreatedTabId=-1;

//Start listening for the 'New Tab event'
chrome.tabs.onCreated.addListener((tab) => {

  //This event gets invoked when a tab is created.
  
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //This event gets invoked when ANY tab is updated.
  //We can play with these events to implement the Quora behavior.

});




 //TODO: do something with 'tab'
//if the current tab is 'Quora' (maybe checking its url) 
//then do the action to skip the login prompt.

async function getCurrentTab() {
    //this code is a sample code taken from:
    //https://developer.chrome.com/docs/extensions/reference/tabs/#get-the-current-tab
    //it works.

    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab.url); //Checking if we retrieved the tab by simply logging the url
    //into the developer console.
    return tab;
  }