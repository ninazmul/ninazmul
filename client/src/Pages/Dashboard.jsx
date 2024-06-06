import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";
import DashPost from "../Components/DashPost";
import DashUsers from "../Components/DashUsers";
import DashComment from "../Components/DashComment";
import DashboardComponent from "../Components/DashboardComponent";
import DashUserDetails from "../Components/DashUserDetails";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* data  */}
      <div className="flex-1">
        {/* dashboard Components */}
        {tab === "dash" && <DashboardComponent />}
        {/* profile */}
        {tab === "profile" && <DashProfile />}
        {/* post */}
        {tab === "posts" && <DashPost />}
        {/* users */}
        {tab === "users" && <DashUsers />}
        {/* comments */}
        {tab === "comments" && <DashComment />}
        {/* user Details */}
        {tab === "userDetails" && <DashUserDetails />}
      </div>
    </div>
  );
};

export default Dashboard;
