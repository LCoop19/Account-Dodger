let activate = document.getElementById("activate_main_functionality");

function handleButtonClick(event)
{
    //TODO: Implement a functionality using the storage API so we can save a user preference.
    activate.innerText= "Deactivate";
}


activate.addEventListener("click", handleButtonClick);

