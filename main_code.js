//quora
console.log('this message is to be seen on the console');

let tab= getCurrentTab(); //TODO: do something with 'tab'
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