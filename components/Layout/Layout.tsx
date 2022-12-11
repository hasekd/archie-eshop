import Header from "../Header/Header";

const Layout = ({ children, products }: any) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
