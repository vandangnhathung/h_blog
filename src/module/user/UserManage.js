import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ActionRemove from "../../components/action/ActionRemove";
import ActionUpdate from "../../components/action/ActionUpdate";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import StatusStyles from "../../components/status/StatusStyles";
import DashboardHeading from "../../drafts/DashboardHeading";
import { db } from "../../firebase-folder/firebase-config";
import UserInfomation from "./UserInformation";

const UserManage = () => {
  //GET API USERLIST
  const [user, setUser] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let userData = [];
      snapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setUser(userData);
    });
  }, []);
  console.log(user);
  //--------------------------------
  return (
    <div className="wrapper">
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button
          to="/manage/add-category"
          height="50px"
          style={{
            fontSize: "20px",
            padding: "25px",
            backgroundImage: "none",
            backgroundColor: "#e8f9f1",
            color: "#1dc071",
            borderRadius: "10px",
          }}
        >
          Add new user
        </Button>
      </DashboardHeading>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full bg-white">
          <thead className="bg-[#e7ecf3]">
            <tr>
              <th className="">Id</th>
              <th className="">Information</th>
              <th className="">Username</th>
              <th className="">Email address</th>
              <th className="">Status</th>
              <th className="">Role</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => {
              return (
                <tr className="">
                  <td>{item.id}</td>
                  <td>
                    <UserInfomation
                      avatar={item?.avatar}
                      createdAt={item?.createdAt}
                      username={item?.username}
                    ></UserInfomation>{" "}
                  </td>
                  <td className="italic text-[#B2B1B9]">Frontend-developer</td>
                  <td>
                    <StatusStyles type="approved"></StatusStyles>
                  </td>
                  <td>{item?.status}</td>
                  <td>{item?.role}</td>
                  <td className="p-0">
                    <div className="flex align-center gap-x-4 justify-center">
                      <ActionUpdate></ActionUpdate>
                      <ActionRemove></ActionRemove>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManage;
