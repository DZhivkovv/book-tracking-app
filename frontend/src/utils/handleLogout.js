//Logs the user out of the application
export function handleLogout(){
    localStorage.removeItem('token'); //Removes the user token from the local storage
    window.location.reload(); // Refreshes the page
}