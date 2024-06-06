import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Select, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleAdmin = async (userId, isAdmin) => {
    try {
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !isAdmin }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, isAdmin: !isAdmin } : user
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleVolunteer = async (userId, isVolunteer) => {
    try {
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVolunteer: !isVolunteer }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, isVolunteer: !isVolunteer } : user
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e, userId) => {
    const { value } = e.target;
    try {
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ designation: value }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, designation: value } : user
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div>
        <h1 className="text-2xl lg:text-3xl mt-5 font-semibold font-serif text-center pb-4">
          All Users
        </h1>
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-[#81b619] scrollbar-thumb-green-900 dark:scrollbar-track-[#4c8e40] dark:scrollbar-thumb-green-200">
          {currentUser.isAdmin && users.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Date Created</Table.HeadCell>
                  <Table.HeadCell>User Image</Table.HeadCell>
                  <Table.HeadCell>User Name</Table.HeadCell>
                  <Table.HeadCell>User Email</Table.HeadCell>
                  <Table.HeadCell>volunteer</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {users.map((user) => (
                  <Table.Body key={user._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell><Link
                            to={`/dashboard?tab=userDetails&userId=${user._id}`}
                          >
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="w-10 h-10 object-cover rounded-full bg-gray-500"
                        /></Link>
                      </Table.Cell>
                      <Table.Cell><Link
                            to={`/dashboard?tab=userDetails&userId=${user._id}`}
                          >{user.username}</Link></Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        <Button
                          outline
                          pill
                          size="sm"
                          gradientDuoTone={
                            user.isVolunteer ? "greenToBlue" : "pinkToOrange"
                          }
                          onClick={() =>
                            handleToggleVolunteer(user._id, user.isVolunteer)
                          }
                        >
                          {user.isVolunteer ? (
                            <FaCheck color="green" />
                          ) : (
                            <FaTimes color="red" />
                          )}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          outline
                          pill
                          size="sm"
                          gradientDuoTone={
                            user.isAdmin ? "greenToBlue" : "pinkToOrange"
                          }
                          onClick={() =>
                            handleToggleAdmin(user._id, user.isAdmin)
                          }
                        >
                          {user.isAdmin ? (
                            <FaCheck color="green" />
                          ) : (
                            <FaTimes color="red" />
                          )}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setUserIdToDelete(user._id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="w-full text-teal-500 self-center text-sm py-7 hover:underline"
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            <p>You have no users yet!</p>
          )}
          <div>
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeleteUser}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl lg:text-3xl mt-5 font-semibold font-serif text-center pb-4">
          All volunteers
        </h1>
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-[#81b619] scrollbar-thumb-green-900 dark:scrollbar-track-[#4c8e40] dark:scrollbar-thumb-green-200">
          {currentUser.isAdmin && users.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Date Created</Table.HeadCell>
                  <Table.HeadCell>User Image</Table.HeadCell>
                  <Table.HeadCell>User Name</Table.HeadCell>
                  <Table.HeadCell>User Email</Table.HeadCell>
                  <Table.HeadCell>Mobile Number</Table.HeadCell>
                  <Table.HeadCell>volunteer</Table.HeadCell>
                  <Table.HeadCell>Designation</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {users
                  .filter((user) => user.isVolunteer)
                  .map((user) => (
                    <Table.Body key={user._id} className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          <Link
                            to={`/dashboard?tab=userDetails&userId=${user._id}`}
                          >
                            <img
                              src={user.profilePicture}
                              alt={user.username}
                              className="w-10 h-10 object-cover rounded-full bg-gray-500"
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link
                            to={`/dashboard?tab=userDetails&userId=${user._id}`}
                          >
                            {user.name}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.number}</Table.Cell>
                        <Table.Cell>
                          <Button
                            outline
                            pill
                            size="sm"
                            gradientDuoTone={
                              user.isVolunteer ? "greenToBlue" : "pinkToOrange"
                            }
                          >
                            {user.isVolunteer ? (
                              <FaCheck color="green" />
                            ) : (
                              <FaTimes color="red" />
                            )}
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <Select
                            onChange={(e) => handleChange(e, user._id)}
                            value={user.designation}
                            className="w-full"
                            id={`designation-${user._id}`}
                          >
                            <option value="President">President</option>
                            <option value="Vice President">
                              Vice President
                            </option>
                            <option value="General Secretary">
                              General Secretary
                            </option>
                            <option value="Joint General Secretary">
                              Joint General Secretary
                            </option>
                            <option value="Organizing Secretary">
                              Organizing Secretary
                            </option>
                            <option value="Treasurer">Treasurer</option>
                            <option value="Public Relation Secretary">
                              Public Relation Secretary
                            </option>
                            <option value="Executive Member">
                              Executive Member
                            </option>
                            <option value="General Member">
                              General Member
                            </option>
                          </Select>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            onClick={() => {
                              setShowModal(true);
                              setUserIdToDelete(user._id);
                            }}
                            className="font-medium text-red-500 hover:underline cursor-pointer"
                          >
                            Delete
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="w-full text-teal-500 self-center text-sm py-7 hover:underline"
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            <p>You have no users yet!</p>
          )}
          <div>
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeleteUser}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
