$("#imagePicker").spartanMultiImagePicker({
  fieldName: "file",
  allowedExt: "png|jpg|jpeg|gif",
  maxCount: 10
});

tinymce.init({
  selector: "textarea#tinyEditor",
  height: 600,
  plugins: [
    "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
    "table emoticons template paste help"
  ],
  toolbar:
    "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify |" +
    " bullist numlist outdent indent | link image | print preview media fullpage | " +
    "forecolor backcolor emoticons | help",
  menu: {
    favs: {
      title: "My Favorites",
      items: "code visualaid | searchreplace | spellchecker | emoticons"
    }
  },
  menubar: "favs file edit view insert format tools table help"
});

const formAddProuct = $("#formAddProuct");
formAddProuct.submit(function() {
  if (validate()) return true;
  else return false;
});

function validate() {
  const imageWrapper = document.getElementsByClassName("spartan_item_wrapper");
  const countImage = imageWrapper.length - 1;
  const startPrice = document.getElementById("startPrice").value;
  const buynowPrice = document.getElementById("buynowPrice").value;
  const bidStep = document.getElementById("bidStep").value;

  if (buynowPrice <= startPrice) {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: "You must set By Now Price > Start Price"
    });
    return false;
  }

  if (bidStep > buynowPrice) {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: "You must set Bid Step < By Now Price"
    });
    return false;
  }

  const enDate = moment(document.getElementById("endDate").value);
  if (enDate < moment()) {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: "Invalid end date"
    });
    return false;
  }

  if (countImage < 3) {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: "Please upload at least 3 images"
    });
    return false;
  }

  return true;
}
