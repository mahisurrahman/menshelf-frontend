import { FaUserSecret } from "react-icons/fa";

const TotalUsers = ({ allUsers }) => {
  return (
    <div className="border-4 rounded-lg h-[14vh] border-b-4 border-b-blue-500">
      <div className="flex items-center justify-between h-full px-5 py-2">
        <FaUserSecret className="text-gray-600 text-4xl" />
        <div className="text-right">
          <h1 className="text-xl font-extrabold text-slate-600">Total Users</h1>
          <p className="text-xl font-bold mt-1">
            {" "}
            =/ <span className="font-normal">{allUsers.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;
