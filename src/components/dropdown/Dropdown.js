import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { db } from "../../firebase-folder/firebase-config";
const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  //GET CATEGORIES DATA
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function addCategory() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      const arrCategories = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arrCategories.push({ id: doc.id, ...doc.data() });
      });
      setCategories(arrCategories);
    }
    addCategory();
  }, []);
  console.log(categories);
  return (
    <div className="relative max-w-[300px]" ref={dropdownRef}>
      <div
        className="border rounded-lg bg-[#e7ecf3]  p-4 cursor-pointer flex justify-between items-center"
        onClick={() => {
          setDropdown(!dropdown);
        }}
      >
        <span>Select your option</span>
        {dropdown ? (
          <TiArrowSortedUp></TiArrowSortedUp>
        ) : (
          <TiArrowSortedDown className=""></TiArrowSortedDown>
        )}
      </div>
      {dropdown && (
        <ul className="rounded-lg border overflow-hidden transition-all">
          {categories.map((item) => (
            <li
              className={`p-4 border-b border-white cursor-pointer transition-all bg-[#e7ecf3] ${
                dropdown ? "h-full" : ""
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
