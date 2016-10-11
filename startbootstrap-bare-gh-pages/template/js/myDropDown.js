//activate the dropdown menu
function myDropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
    return false;
}

// Close the dropdown menu
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    return false;
  }
}