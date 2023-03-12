import { GetServerSidePropsContext } from "next";
import path from "path";
import React, { useEffect } from "react";

interface props {
  x: string;
}

export async function getStaticProps() {
  return {
    props: { x: "asdf" }, // will be passed to the page component as props
  };
}
const Home = ({ x }: props) => {
  // useEffect(() => {
  //   fetch("/api/hello").then((res) => res.json().then((x) => console.log(x)));
  // });

  return <div>{x}</div>;
};

export default Home;
