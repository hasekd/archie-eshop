import React from "react";
import UserInfoForm from "../components/Cart/UserInfoForm";
import CartHeader from "../components/Cart/CartHeader";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";

// const fetchData = async () => {
//   const res = await fetch("http://localhost:1337/api/products?populate=*");
//   const data = await res.json();
//   return data;
// };

const Cart = () => {
  // const { data } = useQuery(["cart"], fetchData);

  return (
    <>
      <CartHeader />
      <UserInfoForm />
    </>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["cart"], fetchData);

//   return {
//     props: { dehydratedState: dehydrate(queryClient) },
//     revalidate: 800,
//   };
// };

export default Cart;
