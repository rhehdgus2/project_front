import React, { useState } from "react";
import './Header.css';
import {Link} from 'react-router-dom';

import Logo from '../../assest/image/logo.png';
import Img01 from '../../assest/image/img01.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useCategoryStore } from "../../stores";
import { useMemberStore } from "../../stores/index3";
import { useCookies } from "react-cookie";
import { link } from "fs";
import { useCountStore } from "../../stores/index5";
import { useAdminStore } from "../../stores/index6";

function Header() {
    const [login, setLogin] = useState<boolean>(false);
    const { setCategory } = useCategoryStore();
    const [cookies , setCookies] = useCookies();
    const { member ,removeMember } = useMemberStore(); 
    const { count } = useCountStore();
    const { admin, removeAdmin } = useAdminStore();

    

    const logOutHandler = () => {
        setCookies('token','',{expires : new Date()});
        removeMember();
        removeAdmin();
        alert('로그아웃 되었습니다.')
    }
    return (
        <div id="wrap">
        <header id="header">
            <div className="mainimg">
                <div>
                    <Link to={ '/' } className = "logo" ><img className="image01" src={Logo} alt=""
                            style={{ "width": "100px", "height" : "130px" }} /></Link>
                    <div className="top_nav">
                        <li>
                            <Link to = { '/About' }>About</Link>
                        </li>
                        <li>
                            <Link to = {'/CategoryMain'}>Product</Link>
                            <ul className="sub">
                                <li><Link to = {'/Category'} onClick={() => setCategory('A')}> Man perfume</Link></li>
                                <li><Link to = {'/Category'} onClick={() => setCategory('B')}> Woman perfume</Link></li>
                                <li><Link to = {'/Category'} onClick={() => setCategory('C')}> Diffuser</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to = {'/Reference'}> Reference</Link>
                        </li>
                        <li>
                            <Link to = {'/QnaBoard'}>Q&A</Link>
                        </li>
                    </div>
                    <div className="icon">
                        <ul className="icon-ul2">
                            
                            
                            { 
                             (!(member === null)) ? (<><Link to={'/Update'}><FontAwesomeIcon icon={faGear} className = "Cart" /></Link><Link to={"/"}><FontAwesomeIcon icon={faLockOpen} className = "lock-open" onClick={() => logOutHandler() }/></Link>
                            <Link to={'/Shopping'}><FontAwesomeIcon icon={faCartShopping} className = "Cart" /></Link><div className="countcontainer">{count}</div> 
                            </>) : 
                            (<><Link to={ '/login' }> <FontAwesomeIcon icon={faUser} className = "User"/></Link>
                            <Link to ={ '/login' }> <FontAwesomeIcon icon={faCartShopping} className = "Cart" /></Link></>)
                            }
                        </ul>
                    </div>
                    
                </div>
            </div>
        </header>
        </div>
    );
}

export default Header;