import React from "react";
import { useActiveDashboard } from "../../contexts/activeItemDashboardContext";
import DashboardHeading from "../../drafts/DashboardHeading";
import UploadImage from "../../images/UploadImage";
const UserProfile = () => {
  const { setDeleteActive } = useActiveDashboard();
  setDeleteActive(true);
  return (
    <div>
      <DashboardHeading
        title="Account profile"
        desc="Update your profile"
      ></DashboardHeading>
      <UploadImage type="userProfile"></UploadImage>
    </div>
  );
};

export default UserProfile;
