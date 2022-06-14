import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ActionRemove from "../../components/action/ActionRemove";
import ActionUpdate from "../../components/action/ActionUpdate";
import ActionView from "../../components/action/ActionView";
import StatusStyles from "../../components/status/StatusStyles";
import DashboardHeading from "../../drafts/DashboardHeading";
import Button from "../../components/button/Button";
import Swal from "sweetalert2";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-folder/firebase-config";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
const CATEGORY_LOADMORE_PAGE = 1;
const CategoryManageStyles = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px;
  border-radius: 10px;
`;
const CategoryManage = () => {
  const [total, setToltal] = useState(0);
  const [lastDoc, setLastDoc] = useState([]);
  const navigate = useNavigate();
  const [getCategories, setGetcategories] = useState([]);
  const [filter, setFilter] = useState("");
  //LOAD MORE FUNCTION
  const handleLoadMore = async () => {
    // Query the first page of docs
    // Construct a new query starting at this document,
    // get the next 25 cities.
    const nextSnapshot = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_LOADMORE_PAGE)
    );
    onSnapshot(nextSnapshot, (querySnapshot) => {
      let arrCategories = [];
      querySnapshot.forEach((item) => {
        arrCategories.push({
          id: item.id,
          ...item.data(),
        });
      });
      setGetcategories([...getCategories, ...arrCategories]);
    });
    const documentSnapshots = await getDocs(nextSnapshot);
    // console.log(documentSnapshots.docs);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  //----------------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "categories");
      const queryCondition = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "~")
          )
        : query(colRef, limit(CATEGORY_LOADMORE_PAGE));
      // console.log(queryCondition);
      const documentSnapshots = await getDocs(queryCondition);
      // Get the last visible document
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setToltal(snapshot.size);
      });

      onSnapshot(queryCondition, (querySnapshot) => {
        let arrCategories = [];
        querySnapshot.forEach((item) => {
          // console.log(item.data().name.toLowerCase());

          arrCategories.push({
            id: item.id,
            ...item.data(),
          });
          // console.log(querySnapshot);
        });
        setGetcategories(arrCategories);
      });
      setLastDoc(lastVisible);
    })();
  }, [filter]);
  // console.log(getCategories);
  //handleRemoveSpecificCategory
  const handleRemoveSpecificCategory = async (id) => {
    const removeSpecific = doc(db, "categories", id);
    Swal.fire({
      title: "Are you sure?",
      text: "1 đi không trở lại nha!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa hả bạn êi!!?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(removeSpecific);
        Swal.fire("Xóa thành công!", "Bái bai =)).", "success");
      }
    });
  };
  //---------------------------
  const handleSearchCategories = debounce((e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  }, 700);
  return (
    <CategoryManageStyles className="">
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button
          to="/manage/add-category"
          height="50px"
          style={{ fontSize: "20px", padding: "10px" }}
        >
          Add new category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end">
        <input
          className="p-3 border mb-2 rounded-lg"
          type="text"
          placeholder="search..."
          onChange={handleSearchCategories}
        />
      </div>
      <div className="overflow-hidden rounded-lg">
        <table className="w-full">
          <thead className="bg-[#e7ecf3]">
            <tr>
              <th className="">Id</th>
              <th className="">Name</th>
              <th className="">Slug</th>
              <th className="">Status</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {getCategories.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td className="italic text-[#B2B1B9]">{data.slug}</td>
                <td>
                  <StatusStyles type={data.status}></StatusStyles>
                </td>
                <td className="p-0">
                  <div className="flex align-center gap-x-4 justify-center">
                    <ActionView></ActionView>
                    <ActionUpdate
                      onClick={() => {
                        navigate(`/manage/update-category?id=${data.id}`);
                      }}
                    ></ActionUpdate>
                    <ActionRemove
                      onClick={() => {
                        handleRemoveSpecificCategory(data.id);
                      }}
                    ></ActionRemove>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {total > getCategories.length && (
            <div className="mt-10">
              <button
                className="p-2 border rounded-lg bg-[#dcfce7] text-[#1dc071] font-semibold opacity-100  hover:opacity-70 transition-all duration-600"
                onClick={handleLoadMore}
              >
                Load more
              </button>
            </div>
          )}
        </table>
      </div>
    </CategoryManageStyles>
  );
};

export default CategoryManage;
