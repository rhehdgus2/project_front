import React from 'react';
import logo from './logo.svg';
import './CategoryMain.css';

import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { useCategoryStore } from '../../stores';

function CategoryMain() {

  const { setCategory } = useCategoryStore();

  return (
    <div className="CategoryMain">
      <section id="sec01">
        <div className="container">
          <div className="img01">
            <NavLink to="/Category"  className="text-info" onClick={() => setCategory('A')}>
              <div className="text00">more</div>
            </NavLink>
          </div>
          <div className="img02">
            <Link to="/Category" className="text-info" onClick={() => setCategory('B')}>
              <div className="text00">more</div>
            </Link>
          </div>
          <div className="img03">
            <Link to="/Category" className="text-info" onClick={() => setCategory('C')}>
              <div className="text00">more</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CategoryMain;
