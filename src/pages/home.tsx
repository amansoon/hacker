import React from "react";
import Layout from "@/components/Layout";
import Folder from "@/components/Folder";

type Props = {};

function Home({}: Props) {
  return (
    <Layout>
      <Folder />
    </Layout>
  );
}

export default Home;
