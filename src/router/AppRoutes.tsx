import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import GetBooks from "@/pages/members/GetBooks";
import AddBook from "@/pages/staff/AddBook";
import { Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path="/member/books" element={<GetBooks/>}/>
      <Route path="/member/borrowings" element={<GetBooks/>}/>
      
      <Route path="/staff/add-book" element={<AddBook/>}/>
      <Route path="/staff/members" element={<GetBooks/>}/>
      <Route path="/staff/books" element={<GetBooks/>}/>
    </Routes>
  );
};