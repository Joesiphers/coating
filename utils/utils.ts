export const parseProducts = (dataArray:[{}] ) => {
   // console.log(dataArray)
    let updateData = [];
    for (let i of dataArray) {
      updateData.push({ ...i, imgurl: JSON.parse(i.imgurl) });
      }
      //console.log("PARSE dataArray")

  return updateData}