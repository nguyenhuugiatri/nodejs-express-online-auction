
module.exports = {
  check: (id,wishList)=>{
    for (let i = 0; i < wishList.length; i++) {
        if (id == wishList[i].id_product) {
          return true;
        }
      }
    return false;
  },
  checkCurrentPrice:(idProduct,listTakePriceNow)=>{
    for (let i = 0; i < listTakePriceNow.length; i++) {
      if (idProduct == listTakePriceNow[i].id) {
        return true;
      }
    }
  return false;
  }
  
};