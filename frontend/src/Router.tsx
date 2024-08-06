import { Routes, Route } from "react-router-dom";
import { Register } from "./page/Register";
import { LoansList } from "./page/LoansList";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Register />}></Route>
      <Route path="/loans" element={<LoansList />}></Route>
    </Routes>
  );
}