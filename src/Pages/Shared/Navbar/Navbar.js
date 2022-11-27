import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { AuthContext } from '../../../contexts/AuthProvider';



const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.error(error));
  };


  const menuItems = <React.Fragment>
    <li className='font-medium'><Link to='/'>Home</Link></li>
    <li className='font-medium'><Link to='/blogs'>Blogs</Link></li>

    {
      user?.uid ?
        <>
          <li className='font-medium'><Link to='/myorders'>My Orders</Link></li>
          <li className='font-medium'><Link to='/myproducts'>My Product</Link></li>
          <li className='font-medium'><Link to='/addproduct'>Add A Product</Link></li>
          <li className='font-medium'><button onClick={handleLogOut}>SignOut</button></li>
        </>
        :
        <li className='font-medium'><Link to='/login'>Login</Link></li>
    }
  </React.Fragment>;
  return (
    <div>
      <div className="navbar bg-primary text-white flex justify-between shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost normal-case text-xl pl-0">
            <img className='h-14' src={logo} alt="" />
            <h2 className='text-2xl'>Mobile Planet</h2>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {menuItems}
          </ul>
        </div>
        <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;