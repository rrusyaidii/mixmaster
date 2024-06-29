import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation(); // useNavigation hook
  const isPageLoading = navigation.state === "loading"; // isPageLoading variable
  return (
    <>
      <Navbar />
      <section className="page">
        {isPageLoading ? <div className="loading" /> : <Outlet />}
      </section>
    </>
  );
};
export default HomeLayout;
