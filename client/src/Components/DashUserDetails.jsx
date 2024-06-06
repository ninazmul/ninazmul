import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "./Loading";

export default function DashUserDetails() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user/getUserDetails/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div>
          {userData ? (
            <div className="flex flex-col items-center m-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={userData.profilePicture}
                  alt={userData.username}
                  className="w-40 lg:w-52 h-40 lg:h-52 rounded-full border-2 border-lime-600"
                />
                <p>@{userData.username}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-sm lg:text-xl text-wrap ">
                  Name:{" "}
                  <span className="font-semibold font-serif">
                    {userData.name}
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap ">
                  Email:{" "}
                  <span className="font-semibold font-serif">
                    {userData.email}
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap">
                  Number:{" "}
                  <span className="font-semibold font-serif">
                    {userData.number}
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap ">
                  Age:{" "}
                  <span className="font-semibold font-serif">
                    {userData.age}
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap">
                  BloodGroup:{" "}
                  <span className="font-semibold font-serif text-red-500">
                    {userData.bloodGroup}
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap ">
                  Address:{" "}
                  <span className="font-semibold font-serif">
                    {userData.address}
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap">
                  Education:{" "}
                  <span className="font-semibold font-serif">
                    {userData.education}
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap">
                  Facebook:{" "}
                  <span className="font-semibold font-serif text-blue-500">
                    <Link to={userData.facebook} target="_blank">
                      {userData.facebook}
                    </Link>
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap">
                  LinkedIn:{" "}
                  <span className="font-semibold font-serif text-blue-500">
                    <Link to={userData.linkedIn} target="_blank">
                      {userData.linkedIn}
                    </Link>
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap">
                  Website/Portfolio:{" "}
                  <span className="font-semibold font-serif text-blue-500">
                    <Link to={userData.website} target="_blank">
                      {userData.website}
                    </Link>
                  </span>
                </h2>
                <h2 className="text-sm lg:text-xl text-wrap text-justify">
                  Thoughts about SDG Goals: <br />
                  <span className="font-semibold font-serif text-justify">
                    {userData.sdg}
                  </span>
                </h2>
              </div>
            </div>
          ) : (
            <p>No user data found</p>
          )}
        </div>
      )}
    </div>
  );
}
