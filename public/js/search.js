function clearBoxes() {
  console.log("AAAAAAAAA");
  var input = sessionStorage.getItem("draft");
  sessionStorage.clear();
  sessionStorage.setItem("draft", input);
}
function SendRequestClickCheckBoxs() {
  var checkboxes = document.getElementsByName("boxes");
  var urlSend = "/store/search?searchInput=";
  var inputSearch = sessionStorage.getItem("draft");
  if (inputSearch) urlSend += inputSearch;
  var selected = document.getElementById("mySelect").value;
  if (selected === "priceDESC") urlSend += "&" + "priceASC" + "=false";
  if (selected === "priceASC") urlSend += "&" + "priceASC" + "=true";
  if (selected === "endDate") urlSend += "&" + "endDate" + "=true";
   
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


var urlCurrent = window.location.href;
var searchInput = document.getElementById("searchInput");
var checkboxes = document.getElementsByName("boxes");
for (let i = 0; i < checkboxes.length; i++) {
  if (sessionStorage.getItem(`${checkboxes[i].id}`) === "checked")
    document.getElementById(`${checkboxes[i].id}`).checked = true;
  else document.getElementById(`${checkboxes[i].id}`).checked = false;
}
var loadSelect = sessionStorage.getItem("selected");
if (loadSelect!==null) document.getElementById("mySelect").value = loadSelect;

if (urlCurrent.indexOf("/search") !== -1) {
  if (sessionStorage.getItem("draft") !== null) {
    searchInput.value = sessionStorage.getItem("draft");
  }
  if (sessionStorage.getItem("draft")=="null")
    searchInput.value ="";
} else {
  sessionStorage.clear();
}
function searchChange() {
  var searchInput = document.getElementById("searchInput");
  sessionStorage.setItem("draft", searchInput.value);
}

const deletePageInURL = URL => {
  const pos = URL.indexOf("&page");
  if (pos !== -1) URL = URL.substring(0, pos);
  return URL;
};

const goToPage = page => {
  const currentURL = deletePageInURL(window.location.href);
  const URL = `${currentURL}&page=${page}`;
  window.location.replace(URL);
};

const backPage = () => {
  let URL, currentPage;
  let currentURL = window.location.href;
  const pos = currentURL.indexOf("&page=");
  if (pos === -1) {
    Swal.fire("Info", "You are at head", "info");
    return;
  }
  currentPage = parseInt(currentURL.substring(pos + "&page=".length));
  if (currentPage - 1 <= 0) {
    Swal.fire("Info", "You are at head", "info");
    return;
  } else {
    deletedPageURL = deletePageInURL(currentURL);
    const URL = `${deletedPageURL}&page=${currentPage - 1}`;
    window.location.replace(URL);
  }
};

const nextPage = max => {
  let URL, currentPage;
  let currentURL = window.location.href;
  const pos = currentURL.indexOf("&page=");
  if (pos === -1) {
    if(max>1){
      const URL = `${currentURL}&page=2`;
      window.location.replace(URL);
    }else{
      Swal.fire("Info", "You are at tail", "info");
      return;
    }
  } else {
    currentPage = parseInt(currentURL.substring(pos + "&page=".length));
    if (currentPage + 1 > max) {
      Swal.fire("Info", "You are at tail", "info");
      return;
    } else {
      deletedPageURL = deletePageInURL(currentURL);
      const URL = `${deletedPageURL}&page=${currentPage + 1}`;
      window.location.replace(URL);
    }
  }
};
