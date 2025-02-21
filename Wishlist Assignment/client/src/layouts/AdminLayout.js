import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Card, List, ListItem, ListItemText, Box, Typography } from "@mui/material";

export default function AdminLayout() {
  return (
    <Box display="flex" height="100vh" bgcolor="customBg.secondary">
      <Card
        sx={{
          width: 280,
          height: "fit-content",
          p: 3,
          m: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary.main" mb={2}>
          Siddhi
        </Typography>
        <List>
          {[
            { text: "Personal Information", path: "/" },
            { text: "My Orders", path: "/orders" },
            { text: "My Wishlists", path: "/wishlist" },
            { text: "Manage Addresses", path: "/addresses" },
            { text: "Logout", path: "/logout" },
            { text: "Delete Account", path: "/delete-account" },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1,
                mb: 1,
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Card>

      <Box flex={1} p={3}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Outlet />
        </Card>
      </Box>
    </Box>
  );
}
