import { useContext } from "react";
import ChangeEmail from "../../Components/UserProfile/ChangeEmail/ChangeEmail";
import ChangeGender from "../../Components/UserProfile/ChangeGender/ChangeGender";
import ChangeNumber from "../../Components/UserProfile/ChangeNumber/ChangeNumber";
// import ChangePassword from "../../Components/UserProfile/ChangePassword/ChangePassword";
import ChangeUserName from "../../Components/UserProfile/ChangeUserName/ChangeUserName";
import DefaultUserData from "../../Components/UserProfile/DefaultUserData/DefaultUserData";
import { AuthContext } from "../../Providers/AuthProviders";
import UserImageProf from "../../Components/UserProfile/UserImageProf/UserImageProf";
import Loading from "../../Components/Loading/Loading";
import ChangeFullName from "../../Components/UserProfile/ChangeFullName/ChangeFullName";
import ChangePassword from "../../Components/UserProfile/ChangePassword/ChangePassword";

const UserProfile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return (
      <div className="bg-fourth w-full h-[80vh] flex justify-center items-center text-3xl font-semibold">
        User not found
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg h-[80vh] overflow-y-scroll">
      <div className="flex items-center justify-between w-full bg-white">
        <DefaultUserData user={user} />
        <UserImageProf user={user}></UserImageProf>
      </div>
      <ChangeUserName />
      <ChangeEmail />
      <ChangePassword />
      <ChangeFullName/>
      <ChangeNumber />
      <ChangeGender />
    </div>
  );
};

export default UserProfile;
