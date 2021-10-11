const regex = new RegExp('quora\\.com\\/(?=\\S*[-])([a-zA-Z-]+)');
//The above 'regex' variable is a Regular Expression pattern
//what it does is that it can be used to check
//whatever text is compared against this pattern so it matches it
//The pattern is:
//the word or the String must contain 'quora.com' and after this it must contain 
//a slash (/) and then it must contain words and hyphens
//for example: How-To-Do-something
//So the full example (in asterisks) will match the pattern
//it is a Quora url for a Question in their website:
//https://www. **quora.com/How-do-I-get-started-using-Quora**
//I am not taking into account the 'https://www.' part as it is not necessary
//for this to work.
let savedQuoraUrl= '';
var startListeningForUpdatesForCreatedTab= false;
let currentCreatedTabId=-1;
let invokingTabId=-1;



//This is to listen for the 'New Tab' event
chrome.tabs.onCreated.addListener((tab) => {
  //This event gets invoked when a tab is created.
  if(tab.pendingUrl== savedQuoraUrl)
  {
    console.log('This tab was created by the extension');
    //I know this because if 'tab.pendingUrl' is not null or empty and
    //equals the url I set up when I opened it in the onUpdated.addListener

    startListeningForUpdatesForCreatedTab= false;
    //the above assignment prevents creating
    //and closing a new Quora tab forever.
    //as if its 'true' then the condition I have in the onUpdated.addListener method
    //below will be true, thus, closing this tab and opening a new
    //one using the url it has.
  }
  else
  {
    startListeningForUpdatesForCreatedTab= true;
  }
  currentCreatedTabId= tab.id;
});

//This listens for the 'Tab Updated' event.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(startListeningForUpdatesForCreatedTab
    && tabId== currentCreatedTabId 
    && changeInfo.status== 'complete'
    && isThisTabAQuoraQuestion(tab.url))
    //It is necessary to have the current created tab 
    //to finish its loading (status: 'complete'),
    //so the tab has an url! 100% guaranteed (lol), 
    //in order to check if its quora.
  {
    savedQuoraUrl= tab.url;

    chrome.tabs.create(
        {
          openerTabId: tabId,
          url: savedQuoraUrl
        }
      ); //opens new tab...

    chrome.tabs.remove(tabId); //...closes current
  }

});

function isThisTabAQuoraQuestion(tabUrl)
{
  return regex.test(tabUrl); 
  //Returns true or false depending on if the 'tabUrl' parameter
  //passed here matches the Regular Expression pattern defined on line 1.
};