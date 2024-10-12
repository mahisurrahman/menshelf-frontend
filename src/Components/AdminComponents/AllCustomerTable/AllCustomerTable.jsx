import React from "react";
import SingleCustomerItem from "../SingleCustomerItem/SingleCustomerItem";

const AllCustomerTable = ({ users, handleDeleteUser }) => {
  return (
    <div className="mt-8 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-fourth">
                  <tr>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                    Username
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-white font-extrabold uppercase"
                    >
                      Member Since
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs text-white font-extrabold uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users &&
                    users.map((user) => (
                      <SingleCustomerItem
                        key={user._id}
                        user={user}
                        handleDeleteUser={handleDeleteUser}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCustomerTable;
