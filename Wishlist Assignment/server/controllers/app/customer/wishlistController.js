const { Wishlist, Collection, Product, Brands, HSNCode } = require("../../../models");

exports.createWishlist = async (req, res) => {
  try {
      const { user_id, name } = req.body;
      const [wishlist, created] = await Wishlist.findOrCreate({
          where: { user_id },
          defaults: { name: name || "My Wishlist" },
      });
      res.status(created ? 201 : 200).json(wishlist);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};
exports.createCollection = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const { name } = req.body;

    // just checking if the wishlist really exist at all
    const wishlist = await Wishlist.findByPk(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const collection = await Collection.create({
      wishlist_id: wishlistId,
      name,
    });

    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllWishlists = async (req, res) => {
  try {
      const wishlists = await Wishlist.findAll();
      res.json(wishlists);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
exports.getUserWishlist = async (req, res) => {
  try {
      const wishlist = await Wishlist.findOne({
          where: { user_id: req.params.userId },
          include: [{ model: Collection, include: [{ model: Product }] }],
      });
      if (!wishlist) {
          return res.status(404).json({ message: "Wishlist not found" });
      }
      res.json(wishlist);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getWishlistCollections = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const wishlist = await Wishlist.findOne({
      where: { id: wishlistId },
      include: [
        {
          model: Collection,
          include: [
            {
              model: Product,
              include: [{ model: Brands }, { model: HSNCode }],
            },
          ],
        },
      ],
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.json(wishlist);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
      const { wishlistId } = req.params;
      const { name } = req.body;
      const wishlist = await Wishlist.findByPk(wishlistId);
      if (!wishlist) {
          return res.status(404).json({ message: "Wishlist not found" });
      }
      if (wishlist.name === "My Wishlist") {
          return res.status(400).json({ message: "Cannot rename default wishlist" });
      }
      wishlist.name = name;
      await wishlist.save();
      res.json(wishlist);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
exports.deleteWishlist = async (req, res) => {
  try {
      const { wishlistId } = req.params;
      const wishlist = await Wishlist.findByPk(wishlistId);
      if (!wishlist) {
          return res.status(404).json({ message: "Wishlist not found" });
      }
      if (wishlist.name === "My Wishlist") {
          return res.status(400).json({ message: "Cannot delete default wishlist" });
      }
      await wishlist.destroy();
      res.status(204).send();
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
exports.deleteCollection = async (req, res) => {
  try {
    const { wishlistId, collectionId } = req.params;

    const collection = await Collection.findOne({
      where: { id: collectionId, wishlist_id: wishlistId },
    });

    if (!collection){
      return res.status(404).json({ message: "Collection not found" });
    }

    await collection.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProductToCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { productId } = req.body;

    const collection = await Collection.findByPk(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await collection.addProduct(product);
    res.status(201).json({ message: "Product added to collection successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeProductFromCollection = async (req, res) => {
  try {
    const { collectionId, productId } = req.params;

    console.log(`Removing Product ID: ${productId} from Collection ID: ${collectionId}`);

    const collection = await Collection.findByPk(collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log(`Found Collection:`, collection);
    console.log(`Found Product:`, product);

    await product.destroy();

    res.status(204).send(); 
  } catch (error) {
    console.error("Error removing product from collection:", error);
    res.status(500).json({ message: "Failed to remove product from collection" });
  }
};
 //not used this move at all 
exports.moveProductBetweenCollections = async (req, res) => {
  try {
    const { sourceCollectionId, targetCollectionId, productId } = req.body;

    const sourceCollection = await Collection.findByPk(sourceCollectionId);
    const targetCollection = await Collection.findByPk(targetCollectionId);

    if (!sourceCollection || !targetCollection) {
      return res.status(404).json({ message: "One or both collections not found" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await sourceCollection.removeProduct(product); // or just use destroy to remove that product
    await targetCollection.addProduct(product);
    
    res.status(200).json({ message: "Product moved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// not moved at alls
exports.moveProductBetweenWishlists = async (req, res) => {
  try {
    const { sourceWishlistId, targetWishlistId, sourceCollectionId, targetCollectionId, productId } = req.body;

    const sourceWishlist = await Wishlist.findByPk(sourceWishlistId);
    const targetWishlist = await Wishlist.findByPk(targetWishlistId);
    const sourceCollection = await Collection.findByPk(sourceCollectionId);
    const targetCollection = await Collection.findByPk(targetCollectionId);

    if (!sourceWishlist || !targetWishlist || !sourceCollection || !targetCollection) {
      return res.status(404).json({ message: "Wishlist or collection not found" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await sourceCollection.removeProduct(product);
    await targetCollection.addProduct(product);

    res.status(200).json({ message: "Product moved between wishlists successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const { wishlistId, collectionId } = req.params;
    const { name } = req.body;

    const collection = await Collection.findOne({
      where: { id: collectionId, wishlist_id: wishlistId },
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    collection.name = name;
    await collection.save();

    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};