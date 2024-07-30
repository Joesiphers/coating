/**manage the products array of object from db TO array [] */
export const parseProducts = (productsArray) => {
  console.log("productARR", productsArray, typeof productsArray);
  // productsArray type of Object
  let updateData = [];
  for (let i of productsArray) {
    //convert imgurl from string to array
    updateData.push({ ...i, imgurl: JSON.parse(i.imgurl) });
  }
  return updateData;
};

/*pass title to url*/
export const parse_title_to_url = (title: string) => {
  const result = title.replaceAll(" ", "-");
  return result;
};
