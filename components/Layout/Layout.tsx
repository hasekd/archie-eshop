import Header from "../Header/Header";
import Navbar from "../Header/Navbar";

const Layout = ({ children, products }: any) => {
  return (
    <>
      <Header />
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
