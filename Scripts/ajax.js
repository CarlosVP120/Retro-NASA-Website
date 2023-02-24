function loadApollo() {
  if (moon) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./Data/Apollo11.txt");
    xhttp.onload = function () {
      document.getElementById("apollo11").innerHTML = this.responseText;
    };
    xhttp.send();
  } else {
    document.getElementById("apollo11").innerHTML = "<span>CLICK ME!</span>";
  }
}

function loadMars() {
  if (mars) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./Data/Mars.txt");
    xhttp.onload = function () {
      document.getElementById("mars").innerHTML = this.responseText;
    };
    xhttp.send();
  } else {
    document.getElementById("mars").innerHTML = "<span>CLICK ME!</span>";
  }
}
