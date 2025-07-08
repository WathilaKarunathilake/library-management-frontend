import { ProtectedRoute } from "@/auth/ProtectedRoute";
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


      <Route path="/member/books" element={
        <ProtectedRoute roles={["LIBRARY"]}>
          <GetBooks/>
        </ProtectedRoute>
      }/>
      <Route path="/member/borrowings" element={
        <ProtectedRoute roles={["LIBRARY"]}>
          <GetBorrowedBooks/>
        </ProtectedRoute>  
      }/>
      

      <Route path="/staff/add-book" element={
        <ProtectedRoute roles={["STAFF"]}>
          <AddBook/>
        </ProtectedRoute>
      }/>
      <Route path="/staff/members" element={
        <ProtectedRoute roles={["STAFF"]}>
          <ViewMembers/>
        </ProtectedRoute>
      }/>
      <Route path="/staff/books" element={
        <ProtectedRoute roles={["STAFF"]}>
          <ViewBooks/>
        </ProtectedRoute>
      }/>

      <Route path="/unathorized" element={<UnauthorizedPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
};