import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Wishlist from "./Wishlist/WishList/WishList"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
  );
}

export default App;