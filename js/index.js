let today = new Date();
document.querySelector("#current_year").innerHTML = today.getFullYear();
document.querySelector("#last_modified").innerHTML = document.lastModified;

function badTest() {
    document.open();
    document.write("<h1>Using this is bad</h1>");
    document.close();
  }
