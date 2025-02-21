import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  DialogActions
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const EditNameModal = ({ open, handleClose, onEdit, initialValue }) => {
  const [name, setName] = React.useState(initialValue || "");

  React.useEffect(() => {
    console.log("Initial Value:", initialValue); 
    setName(initialValue || "");
  }, [initialValue]);

  const handleSave = () => {
    console.log("Saving new name:", name); 
    onEdit(name); 
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: 2,
          minHeight: "365px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        Edit Collection
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 3,
        }}
      >
        <Box
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 3,
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
              minWidth: "40px",
            }}
          >
            Name
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            mt: "auto",
            position: "absolute",
            bottom: 24,
            left: 24,
            right: 24,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              width: "50%",
              bgcolor: "#FF8B3E",
              "&:hover": {
                bgcolor: "#e67e38",
              },
              textTransform: "none",
              py: 1.5,
              borderRadius: 1,
            }}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export const DeleteCollectionModal = ({ open, handleClose, onDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: 2,
          height: "350px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        Delete Collection
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
          Are you sure you want to delete this collection?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            fullWidth
            sx={{
              color: "text.primary",
              borderColor: "divider",
              textTransform: "none",
              py: 1.5,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderColor: "divider",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onDelete} 
            fullWidth
            sx={{
              bgcolor: "#FF8B3E",
              "&:hover": {
                bgcolor: "#e67e38",
              },
              textTransform: "none",
              py: 1.5,
            }}
          >
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};