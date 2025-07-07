import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFoundPage from "@/pages/common/NotFoundPage";
import UnauthorizedPage from "@/pages/common/UnauthorizedPage";
import GetBooks from "@/pages/members/GetBooks";
import { GetBorrowedBooks } from "@/pages/members/GetBorrowedBooks";
import AddBook from "@/pages/staff/AddBook";
import ViewBooks from "@/pages/staff/ViewBooks";
import { ViewMembers } from "@/pages/staff/ViewMembers";
import { Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path="/member/books" element={<GetBooks/>}/>
      <Route path="/member/borrowings" element={<GetBorrowedBooks/>}/>
      
      <Route path="/staff/add-book" element={<AddBook/>}/>
      <Route path="/staff/members" element={<ViewMembers/>}/>
      <Route path="/staff/books" element={<ViewBooks/>}/>

      
      <Route path="/unathorized" element={<UnauthorizedPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
};