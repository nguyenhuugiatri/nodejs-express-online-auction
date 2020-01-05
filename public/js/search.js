function SendRequestClickCheckBoxs() {
  var checkboxes = document.getElementsByName("boxes");
  var urlSend = "/store/search?searchInput=";
  var inputSearch = sessionStorage.getItem("draft");
  if (inputSearch) urlSend += inputSearch;
  var selected = document.getElementById("mySelect").value;
  if (selected === "priceDESC") urlSend += "&" + "priceASC" + "=false";
  else urlSend += "&" + selected + "=true";
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
function selectedSort() {
  var checkboxes = document.getElementsByName("boxes");
  var urlSend = "/store/search?searchInput=";
  var inputSearch = sessionStorage.getItem("draft");
  if (inputSearch) urlSend += inputSearch;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
      urlSend += "&" + checkboxes[i].id + "=true";
    }
  }
  var selected = document.getElementById("mySelect").value;
  if (selected === "priceDESC") urlSend += "&" + "priceASC" + "=false";
  else urlSend += "&" + selected + "=true";
  sessionStorage.setItem(`selected`, selected);
  window.location.replace(urlSend);
}
function clearBoxes() {
  var input = sessionStorage.getItem("draft");
  sessionStorage.clear();
  sessionStorage.setItem("draft", input);
}

var urlCurrent = window.location.href;
var searchInput = document.getElementById("searchInput");
var checkboxes = document.getElementsByName("boxes");

for (let i = 0; i < checkboxes.length; i++) {
  if (sessionStorage.getItem(`${checkboxes[i].id}`) === "checked")
    document.getElementById(`${checkboxes[i].id}`).checked = true;
  else document.getElementById(`${checkboxes[i].id}`).checked = false;
}
var loadSelect = sessionStorage.getItem("selected");
if (loadSelect) document.getElementById("mySelect").value = loadSelect;

if (urlCurrent.indexOf("/search") !== -1) {
  if (sessionStorage.getItem("draft")!==null) {
    searchInput.value = sessionStorage.getItem("draft");
  }
} else {
  sessionStorage.clear();
}
function searchChange() {
  var searchInput = document.getElementById("searchInput");
  sessionStorage.setItem("draft", searchInput.value);
}
