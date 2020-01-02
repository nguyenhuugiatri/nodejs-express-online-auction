$("#imagePicker").spartanMultiImagePicker({
  fieldName: "file",
  allowedExt: "png|jpg|jpeg|gif"
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
