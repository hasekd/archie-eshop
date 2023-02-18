import { Breadcrumb } from "@chakra-ui/react";
import { useLayoutEffect, useState } from "react";
import BreadcrumbComponent from "../Breadcrumb/BreadcrumbComponent";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Header/Navbar";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const Layout = ({ children }: any) => {
  const [width, height] = useWindowSize();
  const crumbs = [{ label: "Home", href: "/" }];
  return (
    <>
      {width > 700 ? <Header /> : ""}
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
