import { Breadcrumb } from "@chakra-ui/react";
import BreadcrumbComponent from "../Breadcrumb/BreadcrumbComponent";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Header/Navbar";

const Layout = ({ children }: any) => {
  const crumbs = [{ label: "Home", href: "/" }];
  return (
    <>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
