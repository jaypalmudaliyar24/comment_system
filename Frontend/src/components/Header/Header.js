import React from 'react';

import './css/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';
// import Stack_Overflow_logo.svg.png from './img/Stack_Overflow_logo.svg.png';

function Header() {
  return (<header>
    
    <div className="header-container">
      <div className="header-left">
        {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/
        Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png' alt='logo'/> */}
        <Link to='/'>
          <h1> Home </h1>
        </Link>
        {/* <h3>Products</h3> */}
      </div>
      <div className="header-middle">
        <div className="header-search-container">
          <SearchIcon />
          <input type="text" placeholder='Search......'/>
        </div>
      </div>
      <div className="header-right">
        <div className="header-right-container">
          <Link>
            <Avatar />
          </Link>
          {/* <InboxIcon /> */}
        </div>
      </div>
    </div>

    </header>)
}

export default Header;
