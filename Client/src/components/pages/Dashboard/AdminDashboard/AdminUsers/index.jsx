import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../../common/Pagination";
import { toast } from "react-toastify";
import { deleteUser, getUsers } from "../../../../../utils/axios-instance";
import Table from "../../../../common/Table";
import ConfirmDeleteModal from "../../../../common/ConfirmDeleteModal";
import Searching from "../../../../common/Searching";
import ButtonComponent from "../../../../common/ButtonComponent";

function Index() {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        if (response.success) {
          setData(response.data);
        } else {
          console.error("Failed to fetch the Users Data", response.error);
        }
      } catch (error) {
        console.error("Error while Fetching users", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/admin-update/${id}`);
  };

  const handleDelete = async (userId) => {
    setUserIdToBeDeleted(userId);
    setShowConfirmationModal(true);
  };

  const deleteUserById = (userId) => {
    deleteUser(userId)
      .then((res) => {
        setData(data.filter((user) => user.id !== userId));
        toast.success("User deleted Successfully!");
        navigate("/admin-users");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setShowConfirmationModal(false);
        setUserIdToBeDeleted(null);
      });
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const shouldRenderPagination = searchResults.length > recordsPerPage;

  const userArray = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "password", label: "Password" },
  ];

  return (
    <>
      {showConfirmationModal && (
        <ConfirmDeleteModal
          Id={userIdToBeDeleted}
          handleDelete={deleteUserById}
          setShowConfirmationModal={setShowConfirmationModal}
          setDataIdToBeDeleted={setUserIdToBeDeleted}
        />
      )}
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4 text-center">List of Users</h1>
        {data.length === 0 ? (
          <div className="text-center py-4">
            <h3 className="text-xl text-gray-500">No users Found!</h3>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:px-20">
              <div className="flex justify-start">
                <Searching
                  dataToSearch={data}
                  setSearchResults={setSearchResults}
                  setCurrentPage={setCurrentPage}
                 
                />
              </div>
              <ButtonComponent buttonStyle="ml-0 sm:ml-4 mt-3 sm:mt-0 bg-green-500 border-green-500 hover:text-green-500 text-base cursor-pointer">
                <Link to="/admin-createUser">ADD</Link>
              </ButtonComponent>
            </div>
            {searchResults.length > 0 ? (
              <Table
                data={searchResults.slice(
                  indexOfFirstRecord,
                  indexOfLastRecord
                )}
                headers={userArray}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ) : (
              <div className="text-center">Oops not found</div>
            )}
            {shouldRenderPagination && (
              <Pagination
                nPages={Math.ceil(searchResults.length / recordsPerPage)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
