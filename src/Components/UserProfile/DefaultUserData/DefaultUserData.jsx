
const DefaultUserData = ({user}) => {
    return (
        <div className="bg-white w-full py-5 px-10 rounded-lg">
            <img src="" className="w-10 rounded-full" alt="" />
            <h1 className=" font-bold text-xl my-4">Name: <span className="font-normal ml-5">{user.userName}</span></h1>
            <h1 className=" font-bold text-xl my-4">Email: <span className="font-normal ml-5">{user.userEmail}</span></h1>
            <h1 className=" font-bold text-xl my-4">Full Name: <span className="font-normal ml-5">{user.userFullName}</span></h1>
            <h1 className=" font-bold text-xl my-4">Gender: <span className="font-normal ml-5">{user.gender}</span></h1>
            <h1 className=" font-bold text-xl my-4">Phone Number: <span className="font-normal ml-5">{user.phoneNumber}</span></h1>
            
        </div>
    );
};

export default DefaultUserData;