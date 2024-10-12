

const UserImageProf = ({user}) => {
    return (
        <div className="bg-white pt-5 px-5">
           <img src={`http://localhost:8000/images/${user.userImg}`} className="w-60 h-40 object-cover" alt="" /> 
        </div>
    );
};

export default UserImageProf;