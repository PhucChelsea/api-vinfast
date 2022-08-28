const faker = require("faker");
const fs = require("fs");

// locale
faker.locale = "vi";

// random data
const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  // loop and push
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.number({ min : 1, max : 2 }),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

// products
const randomProductList = (categoryList, number) => {
  if (number <= 0) return [];
  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(number)).forEach(() => {
      const product = {
        id: faker.datatype.number({ options: 3}),
        categoryId: category.id,
        categoryName: category.name,
        productType: faker.datatype.number({ options: 3}),
        productTypeName: faker.name.firstName(),
        name: faker.commerce.productName(),
        price: Number.parseFloat(faker.commerce.price()),
        imageProduct: faker.image.imageUrl(),
        description: faker.lorem.text(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      productList.push(product);
    });
  }

  return productList;
};

// version list
const randomProductVersionList = (productList, numberVersion) => {
    if(numberVersion <= 0) return [];
    const productVersionList = [];
    for (const product of productList) {
        Array.from(new Array(numberVersion)).forEach(() => {
          const productVersion = {
            id: faker.datatype.number(),
            productType: product.productType,
            productTypeName: product.productTypeName,
            price: Number.parseFloat(faker.commerce.price()),
            imageProduct: faker.image.imageUrl(),
            versionType: faker.datatype.number({ min : 0, max :  2}),
            versionTypeName: faker.name.firstName(),
            description: faker.lorem.text(),
            numberOfSeat: faker.datatype.number({options: 7}),
            size: faker.vehicle.vehicle(),
            wheelBase: faker.datatype.number(),
            maxPower: faker.datatype.number(),
            engine: faker.datatype.number(),
            maximumTorque: faker.datatype.number(),
            groundClearance: faker.datatype.number(),
            fuelCapacity: faker.datatype.number(),
            batteryCapacity: faker.datatype.number(),
            gear: faker.vehicle.vehicle(),
            fuelConsumption: faker.vehicle.vehicle(),
            drive: faker.vehicle.vehicle(),
            emissionStandard: faker.vehicle.vehicle(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          productVersionList.push(productVersion);
        });
      }

      return productVersionList;

}

// // detail version
// const randomDetailByVersion = (productVersionList, number) => {
//     if(number <= 0) return [];
//     const productVersionList = [];
//     const detailProductByVersion = {
//         id: faker.datatype.number(),
//         imageVersion: faker.image.imageUrl(),
//         versionType: productVersionList.versionType,
//         versionTypeName: productVersionList.versionTypeName,
//         price: Number.parseFloat(faker.commerce.price()),
//         description: faker.lorem.text(),
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//     };
    
//     return detailProductByVersion;

// }

// IFFE

(() => {
  // random data
  const categoryList = randomCategoryList(2);
  const productList = randomProductList(categoryList, 4);
  const productVersionList = randomProductVersionList(productList, 3);
//   const versionDetail= randomDetailByVersion(productVersionList, 1)

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    versionList: productVersionList,
    // versionDetail: versionDetail,
  };
  // write db obj
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("ttt");
  });
})();
