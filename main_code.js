const regex = new RegExp('quora\\.com\\/(?=\\S*[-])([a-zA-Z-]+)');
let regexGoogleSearch = /https:\/\/www\.goo[a-zA-Z]le\.c[a-zA-Z]m\/search\?q=/i;
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
let tabWithGoogleSearch= -1;



//This is to listen for the 'New Tab' event
chrome.tabs.onCreated.addListener((tab) => {
  //This event gets invoked when a tab is created.
  if(tab.pendingUrl== savedQuoraUrl)
  {
    console.log('This tab was created by the extension');
    //I know this because 'tab.pendingUrl' is not null or empty and
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

  //TODO: organize this code so it doesn't become an impossible task to maintain it.
  //TODO: document all changes explaining what the code does in general.

  if(isThisTabGoogleSearch(tab.url))
  {
    tabWithGoogleSearch= tab.id;
  }

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
    if(tabId != tabWithGoogleSearch)
    {
      console.log("Tab didn't contain google, closing")
      chrome.tabs.remove(tabId); //...closes current (if not coming from google, because we lose the tab's history)
    }
    else
    {
      //If it comes from google search, lets go back to google search because we already opened a tab with a quora question page.
      chrome.tabs.goBack(
        tabId)
    }
  }

});

function isThisTabAQuoraQuestion(tabUrl)
{
  return regex.test(tabUrl); 
  //Returns true or false depending on if the 'tabUrl' parameter
  //passed here matches the Regular Expression pattern defined on line 1.
};
function isThisTabGoogleSearch(tabUrl)
{
  return regexGoogleSearch.test(tabUrl); 
};