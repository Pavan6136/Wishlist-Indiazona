import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const CollectionSelectionModal = ({
  open,
  handleClose,
  collections,
  onSelectCollection,
}) => {
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleSelect = (collection) => {
    setSelectedCollection(collection);
  };

  const handleConfirm = () => {
    if (selectedCollection) {
      onSelectCollection(selectedCollection.id);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select a Collection</DialogTitle>
      <DialogContent>
        <List>
          {collections.map((collection) => (
            <ListItem
              button
              key={collection.id}
              onClick={() => handleSelect(collection)}
              selected={selectedCollection?.id === collection.id}
            >
              <ListItemText primary={collection.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} disabled={!selectedCollection}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

