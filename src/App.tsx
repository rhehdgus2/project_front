import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';
import Section from './views/Home/Section';
import Login from './views/Login/Login';
import SignUp from './views/SignUp/SignUp'
import CategoryMain from './views/CategoryMain/CategoryMain';
import Category from './views/Category/Category';
import DetailPage from './views/DetailPage/DetailPage';
import Reference from './views/Reference/Reference';
import QnA from './views/QnA/QnA'
import FindId from './views/FindId/FindId';
import FindPassword from './views/FindPassword/FindPassword';
import About from './views/About/About';
import Shopping from './views/Shopping/Shopping';
import OrderCheck from './views/OrderCheck/OrderCheck';
import QnaBoard from './views/QnaBoard/QnaBoard';
import Update from './views/Update/Update';
import QnaDetail from './views/QnaDetail/QnaDetail';
import CategoryCreate from './views/CategoryCreate/CategoryCreate';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Section />} />
          <Route path="/login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="CategoryMain" element={<CategoryMain />} />
          <Route path="Category" element={<Category />} />
          <Route path="DetailPage" element={<DetailPage />} />
          <Route path="Reference" element={<Reference />} />
          <Route path="QnA" element={<QnA />} />
          <Route path="QnaBoard" element={<QnaBoard />} />
          <Route path="FindId" element={<FindId />} />
          <Route path="FindPassword" element={<FindPassword />} />
          <Route path="About" element={<About />} />
          <Route path="Shopping" element={<Shopping />} />
          <Route path="OrderCheck" element={<OrderCheck />} />
          <Route path="Update" element={<Update />} />
          <Route path="QnaDetail" element={<QnaDetail />} />
          <Route path="CategoryCreate" element={<CategoryCreate />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
