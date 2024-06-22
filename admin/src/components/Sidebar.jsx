// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { TbDiscount2, TbCategoryPlus, TbCategory, TbCategory2 } from "react-icons/tb";
import { RiAdvertisementLine, RiCoupon3Line } from "react-icons/ri";
import { MdCategory, MdOutlineAddShoppingCart } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { HiUserGroup } from "react-icons/hi";
import { GiTargetPoster } from 'react-icons/gi';


const Sidebar = () => {
    const [activeSection, setActiveSection] = useState(null);
  
    const toggleSection = (section) => {
      setActiveSection(activeSection === section ? null : section);
    };
    return (
        <aside className="sidebar">
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    {/* <img className="vector-icon" src="./vector.svg" /> */}
                    <RxDashboard size='25px'/>
                    <span className="deals">Dashboard</span>
                </div>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to='discount'>
                        <TbDiscount2 size='25px'/>
                        <span className='deals'>Discount</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="advertise">
                    <RiAdvertisementLine size='25px' />
                        <span className='deals'>Advertise</span>
                    </NavLink>
                </li>

                <li className='sidebar-list-item'>
                    <NavLink to="category">
                    <MdCategory size='25px'/>
                        <span className='deals'>Category</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="subcategory">
                    <TbCategoryPlus size='25px' />
                        <span className='deals'>Sub-category</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="subsubcategory">
                    <TbCategory size='25px' />
                        <span className='deals'>Sub-sub-category</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="subsubsubcategory">
                    <TbCategory2 size='25px' />
                        <span className='deals'>Sub-sub-sub-category</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="brand">
                        <SiBrandfolder size='25px' />
                        <span className='deals'>Brands</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="banner">
                        <GiTargetPoster size='25px'/>
                        <span className='deals'>Banners</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to='customer'>
                    <HiUserGroup size='25px'/>
                        <span className='deals'>Customers</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to='seller'>
                    <MdOutlineAddShoppingCart size='25px'/>
                        <span className='deals'>Sellers</span>
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to ='coupon'>
                        <RiCoupon3Line size='25px'/>
                        <span className='deals'>Coupons</span>
                    </NavLink>
                </li>
                
            </ul>
        </aside>
    )
}

export default Sidebar;


