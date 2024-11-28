// import React, { useContext, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });
//     } catch (err) {
//       setErr(true);
//     }
//   };

//   const handleKey = (e) => {
//     e.code === "Enter" && handleSearch();
//   };

//   // const handleSelect = async () => {
//   //   //check whether the group(chats in firestore) exists, if not create
//   //   const combinedId =
//   //     currentUser.uid > user.uid
//   //       ? currentUser.uid + user.uid
//   //       : user.uid + currentUser.uid;
//   //   try {
//   //     const res = await getDoc(doc(db, "chats", combinedId));
//   //     console.log(res.exists())

//   //     if (!res.exists()) {
//   //       //create a chat in chats collection
//   //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

//   //       //create user chats
//   //       await updateDoc(doc(db, "userChats", currentUser.uid), {
//   //         [combinedId + ".userInfo"]: {
//   //           uid: user.uid,
//   //           displayName: user.displayName,
//   //           // photoURL: user.photoURL,
//   //         },
//   //         [combinedId + ".date"]: serverTimestamp(),
//   //       });

//   //       await updateDoc(doc(db, "userChats", user.uid), {
//   //         [combinedId + ".userInfo"]: {
//   //           uid: currentUser.uid,
//   //           displayName: currentUser.displayName,
//   //           // photoURL: currentUser.photoURL,
//   //         },
//   //         [combinedId + ".date"]: serverTimestamp(),
//   //       });
//   //     }
//   //   } catch (err) { }

//   //   setUser(null);
//   //   setUsername("")
//   // };
//   const handleSelect = async () => {
//     // check whether the group (chats in Firestore) exists, if not create it
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;

//     try {
//       const res = await getDoc(doc(db, "chats", combinedId));

//       if (!res.exists()) {
//         await setDoc(doc(db, "chats", combinedId), { messages: [] });

//         // create user chats for currentUser
//         await setDoc(doc(db, "userChats", currentUser.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: user.uid,
//             displayName: user.displayName,
//             // photoURL: user.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         }, { merge: true }); // using merge to avoid overwriting other fields

//         // create user chats for the selected user
//         await setDoc(doc(db, "userChats", user.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             // photoURL: currentUser.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         }, { merge: true }); // using merge to avoid overwriting other fields
//       }
//     } catch (err) {
//       console.error("Error updating chat:", err);
//       setErr(true);
//     }

//     setUser(null);
//     setUsername("");
//   };

//   // Helper function to update user chat document
//   const updateUserChatDoc = async (uid, chatUser, combinedId) => {
//     const userChatRef = doc(db, "userChats", uid);
//     try {
//       const userChatSnap = await getDoc(userChatRef);
//       if (!userChatSnap.exists()) {
//         await setDoc(userChatRef, {}); // Create the document if it doesn't exist
//       }

//       await updateDoc(userChatRef, {
//         [`${combinedId}.userInfo`]: {
//           uid: chatUser.uid,
//           displayName: chatUser.displayName,
//         },
//         [`${combinedId}.date`]: serverTimestamp(),
//       });
//     } catch (err) {
//       console.error("Error updating user chat:", err);
//       setErr(true);
//     }
//   };

//   return (
//     <div className="search p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-lg mx-auto">
//       <div className="searchForm flex items-center bg-white p-3 rounded-full shadow-md">
//         <input
//           type="text"
//           placeholder="Search..."
//           onKeyDown={handleKey}
//           onChange={(e) => setUsername(e.target.value)}
//           value={username}
//           className="flex-1 bg-transparent outline-none px-2 text-gray-700"
//         />
//       </div>
//       {err && <span className="text-red-500 mt-2">User not found!</span>}
//       {user && (
//         <div className="userChat" onClick={handleSelect}>
//           {/* <img src={user.photoURL} alt="" /> */}
//           <div className="userChatInfo">
//             <span className="font-semibold text-gray-800">{user.displayName}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;



import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // const handleSelect = async () => {
  //   //check whether the group(chats in firestore) exists, if not create
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));
  //     console.log(res.exists())

  //     if (!res.exists()) {
  //       //create a chat in chats collection
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //       //create user chats
  //       await updateDoc(doc(db, "userChats", currentUser.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           // photoURL: user.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, "userChats", user.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //           // photoURL: currentUser.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
  //   } catch (err) { }

  //   setUser(null);
  //   setUsername("")
  // };
  const handleSelect = async () => {
    if (!user || !user.uid) {
      setErr(true);
      return;
    }

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Pass combinedId to the helper function
        await updateUserChatDoc(currentUser.uid, user, combinedId);
        await updateUserChatDoc(user.uid, currentUser, combinedId);
      }
    } catch (err) {
      console.error("Error updating chat:", err);
      setErr(true);
    }

    setUser(null);
    setUsername("");
  };

  // Helper function to update user chat document
  const updateUserChatDoc = async (uid, chatUser, combinedId) => {
    const userChatRef = doc(db, "userChats", uid);
    try {
      const userChatSnap = await getDoc(userChatRef);
      if (!userChatSnap.exists()) {
        await setDoc(userChatRef, {}); // Create the document if it doesn't exist
      }

      await updateDoc(userChatRef, {
        [`${combinedId}.userInfo`]: {
          uid: chatUser.uid,
          displayName: chatUser.displayName,
        },
        [`${combinedId}.date`]: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating user chat:", err);
      setErr(true);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          {/* <img src={user.photoURL} alt="" /> */}
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;