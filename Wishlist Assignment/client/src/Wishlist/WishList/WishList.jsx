import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  CardActionArea,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DeleteCollectionModal, EditNameModal } from "./modals/Modals";
import {CollectionSelectionModal} from "./modals/CollectionSelectionModal";
import { ConfirmationDialog } from "./modals/ConfirmationDialog";
import axios from "axios";

export default function WishlistPage() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collections, setCollections] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const handleOpenConfirmationDialog = (product) => {
    setProductToRemove(product);
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setProductToRemove(null);
  };
  const handleConfirmRemove = async () => {
    if (productToRemove && selectedCollection) {
      await handleRemoveProduct(selectedCollection.id, productToRemove.id);
      handleCloseConfirmationDialog();
      // fetchWishlistItems(selectedCollection.id); // Refresh the collection
    }
  };
  const handleOpenCollectionModal = (productId) => {
    setSelectedProductId(productId);
    setOpenCollectionModal(true);
  };

  const handleCloseCollectionModal = () => {
    setOpenCollectionModal(false);
    setSelectedProductId(null);
  };
  const handleOpenDelete = () => setOpenDeleteModal(true);
  const handleCloseDelete = () => setOpenDeleteModal(false);
  const handleOpenEdit = () => setOpenEditModal(true);
  const handleCloseEdit = () => {
    console.log("Closing edit modal"); 
    setOpenEditModal(false);
  };  const handleOpenCreate = () => setOpenCreateModal(true);
  const handleCloseCreate = () => setOpenCreateModal(false);
  const handleCollectionClick = async (collection) => {
    console.log("Selected Collection:", collection); 
    setSelectedCollection(collection);
    await fetchWishlistItems(collection.id);
  };

  const handleCreateCollection = async () => {
    try {
      const wishlistId = 1; 
      const response = await axios.post(
        `http://localhost:8000/api/v1/wishlist/${wishlistId}/collections`,
        { name: newCollectionName }
      );

      console.log("Collection created:", response.data);

      setCollections((prevCollections) => [...prevCollections, response.data]);

      setNewCollectionName("");
      handleCloseCreate();
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const handleBackClick = () => {
    setSelectedCollection(null);
  };

  const handleDelete = async () => {
    if (!selectedCollection || !selectedCollection.wishlist_id) {
      console.error("No collection selected or wishlistId is missing");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/wishlist/${selectedCollection.wishlist_id}/collections/${selectedCollection.id}`
      );
      console.log("Collection deleted:", response.data);
  
      fetchCollections(selectedCollection.wishlist_id);
  
      setSelectedCollection(null);
  
      handleCloseDelete();
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const handleEdit = async (newName) => {
    console.log("Selected Collection in handleEdit:", selectedCollection); 
  
    if (!selectedCollection || !selectedCollection.wishlist_id) {
      console.error("No collection selected or wishlistId is missing");
      return;
    }
  
    console.log("Updating collection:", selectedCollection.id, "with name:", newName); 
  
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/wishlist/${selectedCollection.wishlist_id}/collections/${selectedCollection.id}`,
        { name: newName }
      );
      console.log("Collection updated:", response.data); 
  
      setCollections((prevCollections) => {
        const updatedCollections = prevCollections.map((col) =>
          col.id === selectedCollection.id ? { ...col, name: newName } : col
        );
        console.log("Updated Collections:", updatedCollections); 
        return updatedCollections;
      });
  
      setSelectedCollection((prev) => {
        const updatedSelectedCollection = { ...prev, name: newName };
        console.log("Updated Selected Collection:", updatedSelectedCollection); 
        return updatedSelectedCollection;
      });
  
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating collection:", error); 
    }
  };
  const fetchCollections = async (wishlistId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/wishlist/${wishlistId}/collections`
      );
      if (response.data && response.data.Collections) {
        setCollections(response.data.Collections);
      } else {
        setCollections([]); 
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };
  const fetchWishlistItems = async (collectionId) => {
    try {
      const collection = collections.find((col) => col.id === collectionId);
      if (collection && collection.Products) {
        setWishlistItems(collection.Products);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };
  const handleAddProduct = async (collectionId, productId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/wishlist/collections/${collectionId}/add-product`,
        { productId }
      );
      console.log("Product added:", response.data);
  
      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.id === collectionId
            ? {
                ...collection,
                Products: [...collection.Products, response.data.product], 
              }
            : collection
        )
      );
  
      fetchCollections(collectionId);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const handleSelectCollection = async (collectionId) => {
    if (selectedProductId) {
      await handleAddProduct(collectionId, selectedProductId);
      fetchCollections(collectionId);
    }
  };
  const handleRemoveProduct = async (collectionId, productId) => {
    if (!selectedCollection) {
      console.error("No collection selected");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/wishlist/collections/${collectionId}/remove-product/${productId}`
      );
      console.log("Product removed:", response.data);
  
      await fetchWishlistItems(collectionId);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  
  const handleMoveProduct = async (sourceCollectionId, targetCollectionId, productId) => {
    if (!selectedCollection) {
      console.error("No collection selected");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/wishlist/collections/move-product`,
        { sourceCollectionId, targetCollectionId, productId }
      );
      console.log("Product moved:", response.data);
      fetchWishlistItems(sourceCollectionId); 
      fetchWishlistItems(targetCollectionId);
    } catch (error) {
      console.error("Error moving product:", error);
    }
  };

  useEffect(() => {
    fetchCollections(1);
  }, []);

  const renderHome = () => (
    <>
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            Collections
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#FF8B3E",
              "&:hover": { bgcolor: "#e67e38" },
            }}
            onClick={handleOpenCreate}
          >
            Create
          </Button>
        </Box>
        <Grid container spacing={3}>
          {collections.map((collection) => (
            <Grid item xs={6} md={4} key={collection.id}>
              <Card sx={{ boxShadow: "none", bgcolor: "transparent" }}>
                <CardActionArea
                  onClick={() => handleCollectionClick(collection)}
                >
                  <Box>
                    <CardMedia
                      component="img"
                      height="300"
                      image={collection.image || "https://via.placeholder.com/300"}
                      alt={collection.name}
                      sx={{
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 1.5,
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "text.primary",
                        fontWeight: 500,
                        fontSize: "1rem",
                      }}
                    >
                      {collection.name}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ margin: "0 auto" }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
        >
          All Wishlist
        </Typography>
        <Grid container spacing={2}>
          {wishlistItems.map((item) => (
            <Grid item xs={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 1,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                }}
              >
                <Box sx={{ position: "relative", paddingTop: "100%" }}>
                  <CardMedia
                    component="img"
                    image={item.image || "https://via.placeholder.com/300"}
                    alt={item.name}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      padding: "4px",
                      width: "32px",
                      height: "32px",
                    }}
                    onClick={()=> handleOpenConfirmationDialog(item)}
                  >
                    <FavoriteIcon sx={{ fontSize: 25, color: "#FF985F" }}  />
                  </IconButton>
                </Box>
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      Rs.{item.price || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        textDecoration: "line-through",
                      }}
                    >
                      Rs.{item.originalPrice || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#FF8B3E",
                        fontWeight: 500,
                      }}
                    >
                      {item.price && item.originalPrice
                        ? `${Math.round(
                            ((item.originalPrice - item.price) /
                              item.originalPrice) *
                              100
                          )}% OFF`
                        : "N/A"}
                    </Typography>
                  </Box>
                  <Button
        variant="contained"
        sx={{
          bgcolor: "#FF8B3E",
          "&:hover": { bgcolor: "#e67e38" },
        }}
        onClick={() => handleOpenCollectionModal(item.id)} 
      >
        Add to Collection
      </Button>
     
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FF8B3E",
                      "&:hover": { bgcolor: "#e67e38" },
                    }}
                    onClick={() => handleRemoveProduct(selectedCollection.id, item.id)}
                  >
                    Remove from Wishlist
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#FF8B3E",
                      "&:hover": { bgcolor: "#e67e38" },
                    }}
                    onClick={() => handleMoveProduct(selectedCollection.id, 1, item.id)}
                  >
                    Move to Another Wishlist
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );

  const renderCollection = () => (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            {selectedCollection?.name || "Untitled Collection"}
          </Typography>
          <IconButton onClick={handleOpenEdit}>
            <EditIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FF8B3E",
            "&:hover": { bgcolor: "#e67e38" },
          }}
          onClick={handleOpenDelete}
        >
          Delete
        </Button>
      </Box>
  
      <Grid container spacing={2}>
        {wishlistItems.map((item) => (
          <Grid item xs={6} md={4} key={item.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 1,
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              }}
            >
              <Box sx={{ position: "relative", paddingTop: "100%" }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    padding: "4px",
                    width: "32px",
                    height: "32px",
                  }}
                  onClick={() => handleOpenConfirmationDialog(item)} 
                >
                  <FavoriteIcon sx={{ fontSize: 25, color: "#FF985F" }} />
                </IconButton>
              </Box>
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    Rs.{item.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "line-through",
                    }}
                  >
                    Rs.{item.originalPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#FF8B3E",
                      fontWeight: 500,
                    }}
                  >
                    {Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                        100
                    )}
                    % OFF
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
    return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {selectedCollection ? renderCollection() : renderHome()}

      <EditNameModal
        open={openEditModal}
        handleClose={handleCloseEdit}
        onEdit={handleEdit}
        initialValue={selectedCollection?.name}
      />
      <DeleteCollectionModal
        open={openDeleteModal}
        handleClose={handleCloseDelete}
        onDelete={handleDelete}
        collectionName={selectedCollection?.name}
      />
       <CollectionSelectionModal
        open={openCollectionModal}
        handleClose={handleCloseCollectionModal}
        collections={collections}
        onSelectCollection={handleSelectCollection}
      />
      <ConfirmationDialog
        open={openConfirmationDialog}
        handleClose={handleCloseConfirmationDialog}
        onConfirm={handleConfirmRemove}
        productName={productToRemove?.name}
      />
      <Dialog open={openCreateModal} onClose={handleCloseCreate}>
        <DialogTitle>Create New Collection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>Cancel</Button>
          <Button onClick={handleCreateCollection} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}