import { createContext, useContext, useState } from "react";
const ActiveDashboard = createContext();
function ActiveDashboardProvider(props) {
  const handleActive = (e) => {
    const activeDiv = e.target;
    const activeDivArr = document.querySelectorAll(".dashboard-item");
    if (!activeDiv) return;
    activeDivArr.forEach((item) => item.classList.remove("active"));
    activeDiv.classList.add("active");
  };
  const [deleteActive, setDeleteActive] = useState(false);
  const value = { handleActive, deleteActive, setDeleteActive };
  return (
    <ActiveDashboard.Provider
      value={value}
      {...props}
    ></ActiveDashboard.Provider>
  );
}
function useActiveDashboard() {
  const context = useContext(ActiveDashboard);
  if (typeof context === "undefined")
    throw new Error("useAuth must be within the AuthProvider method");
  return context;
}

export { ActiveDashboardProvider, useActiveDashboard };
