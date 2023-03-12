import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div>
      {id}
      {id ? <Image src={`/${id}.jpg`} alt="a pphoto" width={500} height={500} /> : null}
    </div>
  );
};

export default Home;
