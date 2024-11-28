// import React, { useContext } from 'react';
// import { signOut } from "firebase/auth";
// import { auth } from '../firebase';
// import { AuthContext } from '../context/AuthContext';
// import { FaPowerOff } from 'react-icons/fa'; // Import logout icon
// import React, { useContext } from 'react'
// import { signOut } from "firebase/auth"
// import { auth } from '../firebase'
// import { AuthContext } from '../context/AuthContext'

// const Navbar = () => {
//   const { currentUser } = useContext(AuthContext);
//   const { currentUser } = useContext(AuthContext)

//   return (
//     <div className="navbar bg-white shadow-md p-4 flex justify-between items-center">
//       <span className="logo text-2xl font-semibold text-blue-600">Secure Chat</span>

//       <div className="user flex items-center space-x-3">
//         <img
//           src={currentUser.photoURL}
//           alt="User Profile"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <span className="text-gray-800 font-medium">{currentUser.displayName}</span>
//         <button
//           onClick={() => signOut(auth)}
//           className="text-gray-600 hover:text-red-500 p-2 rounded-full transition duration-200"
//         >
//           <FaPowerOff className="w-5 h-5" />
//         </button>
//         <div className='navbar'>
//           <span className="logo">Lama Chat</span>
//           <div className="user">
//             {/* <img src={currentUser.photoURL} alt="" /> */}
//             <span>{currentUser.displayName}</span>
//             <button onClick={() => signOut(auth)}>logout</button>
//           </div>
//         </div>
//         );
// };

//         export default Navbar;


import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { FaPowerOff } from 'react-icons/fa'; // Import logout icon

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar bg-white shadow-md p-4 flex justify-between items-center">
      <span className="logo text-2xl font-semibold text-blue-600">Secure Chat</span>

      <div className="user flex items-center space-x-3">
        <img
          src={currentUser?.photoURL || '/default-profile.png'} // Optional chaining for safety
          alt="User Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-gray-800 font-medium">{currentUser?.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="text-gray-600 hover:text-red-500 p-2 rounded-full transition duration-200"
        >
          <FaPowerOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
