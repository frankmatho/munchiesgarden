import React, { useState, useContext } from 'react';
import { AiFillTag, AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill, BsFillSaveFill } from 'react-icons/bs';
import { CartContext } from '../context/CartContext';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaUserFriends, FaWallet } from 'react-icons/fa';
import { MdFavorite, MdHelp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, updateCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    navigate('/logout')
  };

  const handlePayNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += delta;

    if (updatedCart[index].quantity < 1) {
      updatedCart.splice(index, 1); // remove item if quantity is 0
    }
    updateCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className='max-w[1640px] mx-auto flex justify-between items-center p-4'>
      {/* Left side */}
      <div className='flex items-center '>
        <div className='cursor-pointer' onClick={() => setMenuOpen(!menuOpen)}>
          <AiOutlineMenu size={30} />
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
          Munchies<span className='font-bold'>Garden</span>
        </h1>
        <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text=[14px]'>
          <p className='bg-black text-white rounded-full p-2'>Delivery</p>
          <p className='p-2'>Pickup</p>
        </div>
      </div>

      {/* Search input */}
      <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
        <AiOutlineSearch size={25} />
        <input
          id='search'
          className='bg-transparent border-none p-2 w-full focus:outline-none'
          type='text'
          placeholder='search food'
        />
      </div>

      {/* Log In Button (hidden if user is logged in) */}
      {!user && (
        <button
          onClick={handleLoginClick}
          className='bg-black text-white hidden md:flex items-center px-2.5 py-2 rounded-full'
        >
          Log In
        </button>
      )}

      {/* Cart Button */}
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className='bg-black text-white hidden md:flex items-center px-2.5 py-2 rounded-full'
      >
        <BsFillCartFill size={20} className='mr-2' />
        Cart ({cartItems.length})
      </button>

      {/* Cart Dropdown */}
      {cartOpen && (
        <div className='absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-80 z-50'>
          <h2 className='font-bold text-lg'>Cart Items</h2>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={item.id || index} className='flex justify-between items-center py-2'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-12 h-12 object-cover rounded'
                  />
                  <div className='flex-1 px-2'>
                    <p>{item.name}</p>
                    <p>Ksh {item.price}</p>
                  </div>
                  <div className='flex items-center'>
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className='bg-gray-200 px-2 rounded'
                    >
                      -
                    </button>
                    <span className='px-2'>{item.quantity || 0}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className='bg-gray-200 px-2 rounded'
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500'>Your cart is empty.</p>
          )}
          <div className='border-t mt-4 pt-4'>
            <p className='font-bold text-lg'>Total: Ksh {calculateTotalPrice()}</p>
            <button
              onClick={handlePayNow}
              className='bg-black text-white w-full py-2 rounded mt-2'
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Overlay for side menu */}
      {menuOpen && (
        <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div>
      )}

      {/* Side Drawer Menu */}
      <div
        className={
          menuOpen
            ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300'
            : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
        }
      >
        <AiOutlineClose
          onClick={() => setMenuOpen(false)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4'>
          Munchies<span className='font-bold'>Garden</span>
        </h2>
        <nav>
          <ul className='flex flex-col p-4 text-gray-800'>
            <li className='text-xl py-4 flex cursor-pointer'>
              <TbTruckDelivery size={25} className='mr-4' />
              Orders
            </li>
            <li className='text-xl py-4 flex cursor-pointer'>
              <MdFavorite size={25} className='mr-4' />
              Favourites
            </li>
            <li className='text-xl py-4 flex cursor-pointer'>
              <FaWallet size={25} className='mr-4' />
              Wallet
            </li>
            <li className='text-xl py-4 flex cursor-pointer'>
              <MdHelp size={25} className='mr-4' />
              Help
            </li>
            <li className='text-xl py-4 flex cursor-pointer'>
              <AiFillTag size={25} className='mr-4' />
              Promotion
            </li>
            <li className='text-xl py-4 flex cursor-pointer'>
              <BsFillSaveFill size={25} className='mr-4' />
              Best ones
            </li>
            <li onClick={handleLogoutClick} className='text-xl py-4 flex cursor-pointer'>
              <FaUserFriends size={25} className='mr-4' />
              Log Out
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
