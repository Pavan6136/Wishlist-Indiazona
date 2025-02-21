const db = require("./models");

const seedDatabase = async () => {
  await db.sequelize.sync({ force: true });

  const wishlist = await db.Wishlist.create({
    user_id: 1,
    name: "My Wishlist",
  });

  const mensCollection = await db.Collection.create({
    wishlist_id: wishlist.id,
    name: "Men's Collection",
  });

  const womensCollection = await db.Collection.create({
    wishlist_id: wishlist.id,
    name: "Women's Collection",
  });

  const nike = await db.Brands.create({ name: "Nike" });
  const adidas = await db.Brands.create({ name: "Adidas" });
  const puma = await db.Brands.create({ name: "Puma" });
  const reebok = await db.Brands.create({ name: "Reebok" });
  const underArmour = await db.Brands.create({ name: "Under Armour" });

  const sportsWear = await db.HSNCode.create({ code: "1234", description: "Sports Wear" });
  const casualWear = await db.HSNCode.create({ code: "5678", description: "Casual Wear" });
  const formalWear = await db.HSNCode.create({ code: "9101", description: "Formal Wear" });

  await db.Product.bulkCreate([
    { collection_id: mensCollection.id, brand_id: nike.id, hsn_code_id: sportsWear.id, name: "Nike Air Max 270", price: 160.99 },
    { collection_id: mensCollection.id, brand_id: adidas.id, hsn_code_id: sportsWear.id, name: "Adidas Ultraboost 22", price: 190.99 },
    { collection_id: mensCollection.id, brand_id: puma.id, hsn_code_id: casualWear.id, name: "Puma Suede Classic", price: 85.99 },
    { collection_id: mensCollection.id, brand_id: reebok.id, hsn_code_id: sportsWear.id, name: "Reebok Nano X1", price: 130.99 },
    { collection_id: mensCollection.id, brand_id: underArmour.id, hsn_code_id: formalWear.id, name: "Under Armour Charged Rogue", price: 110.99 },
  ]);

  await db.Product.bulkCreate([
    { collection_id: womensCollection.id, brand_id: nike.id, hsn_code_id: sportsWear.id, name: "Nike Air Force 1 Shadow", price: 125.99 },
    { collection_id: womensCollection.id, brand_id: adidas.id, hsn_code_id: sportsWear.id, name: "Adidas NMD R1", price: 150.99 },
    { collection_id: womensCollection.id, brand_id: puma.id, hsn_code_id: casualWear.id, name: "Puma Cali Sneakers", price: 95.99 },
    { collection_id: womensCollection.id, brand_id: reebok.id, hsn_code_id: formalWear.id, name: "Reebok Classic Leather", price: 105.99 },
    { collection_id: womensCollection.id, brand_id: underArmour.id, hsn_code_id: sportsWear.id, name: "Under Armour HOVR Phantom", price: 140.99 },
  ]);

  console.log("Database seeded with additional men's and women's products!");
};

seedDatabase();
