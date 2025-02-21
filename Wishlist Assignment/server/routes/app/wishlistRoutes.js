const express = require("express");
const router = express.Router();
const wishlistController = require("../../controllers/app/customer/wishlistController");

router.get("/", wishlistController.getAllWishlists);
router.post("/", wishlistController.createWishlist);
router.get("/user/:userId", wishlistController.getUserWishlist);
router.get("/:wishlistId/collections", wishlistController.getWishlistCollections);
// router.put("/:wishlistId", wishlistController.updateWishlist);
// router.delete("/:wishlistId", wishlistController.deleteWishlist);
router.post("/:wishlistId/collections", wishlistController.createCollection);
router.delete("/:wishlistId/collections/:collectionId", wishlistController.deleteCollection);
router.put("/:wishlistId/collections/:collectionId", wishlistController.updateCollection);
router.post("/collections/:collectionId/add-product", wishlistController.addProductToCollection);
router.delete("/collections/:collectionId/remove-product/:productId", wishlistController.removeProductFromCollection);
router.put("/collections/move-product", wishlistController.moveProductBetweenCollections);    //not used
router.put("/collections/move-product-between-wishlists", wishlistController.moveProductBetweenWishlists);  //not used at all

module.exports = router;