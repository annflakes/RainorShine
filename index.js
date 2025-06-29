function weather() {
  const input = document.getElementById("city"); 
  const city = input.value.trim();              

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  window.location.href = "weatherinfo.html?city=" + encodeURIComponent(city);
  input.value = ""; 
}



