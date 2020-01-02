function SendRequestClickCheckBoxs() {
  var checkboxes = document.getElementsByName("boxes");
  var urlSend = "/store/search?searchInput=";
  var inputSearch = sessionStorage.getItem("draft");
  urlSend += inputSearch;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
      urlSend += "&" + checkboxes[i].id + "=true";
    }
    checkboxes[i].addEventListener("change", function() {
      if (checkboxes[i].checked == true)
        sessionStorage.setItem(`${checkboxes[i].id}`, "checked");
      else sessionStorage.setItem(`${checkboxes[i].id}`, "unchecked");
    });
  }
  window.location.replace(urlSend);
}
var urlCurrent = window.location.href;
var searchInput = document.getElementById("searchInput");
var checkboxes = document.getElementsByName("boxes");

for (let i = 0; i < checkboxes.length; i++) {
  if (sessionStorage.getItem(`${checkboxes[i].id}`) == "checked")
    document.getElementById(`${checkboxes[i].id}`).checked = true;
  else document.getElementById(`${checkboxes[i].id}`).checked = false;
}

if (urlCurrent.indexOf("/search") !== -1)
  searchInput.value = sessionStorage.getItem("draft");

searchInput.addEventListener("change", function() {
  sessionStorage.setItem("draft", searchInput.value);
});
