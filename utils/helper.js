module.exports = {
  check: (id, wishList) => {
    for (let i = 0; i < wishList.length; i++) {
      if (id == wishList[i].id_product) {
        return true;
      }
    }
    return false;
  },
  checkCurrentPrice: (idProduct, listTakePriceNow) => {
    for (let i = 0; i < listTakePriceNow.length; i++) {
      if (idProduct == listTakePriceNow[i].id) {
        return true;
      }
    }
    return false;
  },
  maskNameString: name => {
    var lengthname = name.length;
    var rs = name.substring(parseInt(lengthname / 2), lengthname);
    var result = "***" + rs;
    return result;
  },
  convertTimeLeft: t => {
    var cd = 86400000,
      ch = 3600000,
      cm = 60000,
      cs = 1000,
      d = Math.floor(t / cd),
      h = Math.floor((t - d * cd) / ch),
      m = Math.floor((t - d * cd - h * ch) / cm),
      s = Math.round((t - d * cd - h * ch - m * cm) / 1000),
      pad = function(n) {
        return n < 10 ? "0" + n : n;
      };
    if (m === 60) {
      h++;
      m = 0;
    }
    if (h === 24) {
      d++;
      h = 0;
    }
    if (s === 60) {
      m++;
      s = 0;
    }
    var result = d + " days " + pad(h) + ":" + pad(m) + ":" + pad(s);
    return result;
  }
};
