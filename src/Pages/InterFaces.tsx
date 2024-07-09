import React, { useEffect, useState } from "react";
import { Private_api } from "../API/api";
import APIS from "../API/endPoints";
import { IconContext } from "react-icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";
import { MdOutlineSettings } from "react-icons/md";

import { toast } from "react-toastify";
interface InterMiami {
  id: string;
  title: string;
  content: string;
  CreationDate: string;
  owner: {
    username: string;
  };
}
const InterFaces = () => {
  const token = localStorage.getItem("token");
  const roles = localStorage.getItem("role");
  const navigate = useNavigate();

  const [users, setUsers] = useState<InterMiami[]>([]);
  const [error, setError] = useState<string | null>();

  if (token === null) {
    navigate("/LoginPage");
  }

  const ShowAllInterface = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      const response = await Private_api.get(APIS.GET_ALL_INTERFACES);
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    ShowAllInterface();
  });

  const ChangeINterface = async (id: string) => {
    const newTitle = prompt("Type your new Title");
    const TX = {
      title: newTitle,
    };
    try {
      const response = await Private_api.patch(
        `${APIS.CHANGE_INTERFACE}/${id}`,
        TX
      );
      if (response.status === 200) {
        toast.success("Interface Changed successfully");
      } else {
        toast.error("Failed to Change Interface");
      }
    } catch (error) {
      toast.error("Failed to Change Interface");
    }
  };

  const DeleteInterface = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      const response = await Private_api.delete(
        `${APIS.DELETE_INTERFACE}/${id}`
      );
      if (response.status === 200) {
        window.location.reload();
        toast.success("Interface Deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interfaces</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Owner</th>
              <th className="py-2 px-4 border-b border-gray-200">Title</th>
              <th className="py-2 px-4 border-b border-gray-200">
                CreationDate
              </th>
              <th className="py-2 px-4 border-b border-gray-200">Content</th>
              <th className="py-2 px-4 border-b border-gray-200">Delete</th>
              <th className="py-2 px-4 border-b border-gray-200">
                Change Title
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.owner.username}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.CreationDate}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.content}
                </td>
                <td className=" justify-center py-2 px-4  border-b border-gray-200">
                  <IconContext.Provider value={{ color: "red", className: "" }}>
                    <button onClick={() => DeleteInterface(user.id)}>
                      <RiDeleteBin6Line />
                    </button>
                  </IconContext.Provider>
                </td>
                <td className=" justify-center py-2 px-4  border-b border-gray-200">
                  <IconContext.Provider
                    value={{ color: "blue", className: "" }}
                  >
                    <button onClick={() => ChangeINterface(user.id)}>
                      <MdOutlineSettings />
                    </button>
                  </IconContext.Provider>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterFaces;
