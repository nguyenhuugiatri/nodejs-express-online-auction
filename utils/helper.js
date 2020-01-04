
module.exports = {
  check: (id,wishList)=>{
    for (let i = 0; i < wishList.length; i++) {
        if (id == wishList[i].id_product) {
          return true;
        }
      }
    return false;
  }
  
};