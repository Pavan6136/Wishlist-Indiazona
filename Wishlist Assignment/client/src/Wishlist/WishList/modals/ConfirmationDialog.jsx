import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export const ConfirmationDialog = ({ open, handleClose, onConfirm, productName }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Remove Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure that you  want to remove  <strong>{productName}</strong> from this collection?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

