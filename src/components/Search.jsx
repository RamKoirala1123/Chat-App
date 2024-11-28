import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
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

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await setDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }, { merge: true });

        await setDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }, { merge: true });
      }
    } catch (err) {
      console.error("Error creating user chat documents:", err);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <div className="searchForm flex items-center bg-white p-3 rounded-full shadow-md">
        <input
          type="text"
          placeholder="Search..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="flex-1 bg-transparent outline-none px-2 text-gray-700"
        />
      </div>
      {err && <span className="text-red-500 mt-2">User not found!</span>}
      {user && (
        <div
          className="userChat mt-4 p-3 flex items-center space-x-3 hover:bg-gray-100 rounded-lg cursor-pointer"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="userChatInfo">
            <span className="font-semibold text-gray-800">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
