// import { Button } from "@/Components/Button";
import { Button } from "@/Components/Button";

import { Input } from "@/Components/Input";

import { useState } from "react";

// interface chatProps {
//   users: string[];
// }
// export async function getServerSideProps() {
//   return {
//     // props: { msgsProps: getMessages() }, // will be passed to the page component as props
//   };
// }

const Home = () => {
  const [loginData, setLoginData] = useState<{ username: string; password: string }>({
    password: "",
    username: "",
  });
  const submitRequest = async () => {
    const req = await fetch("/api/login", { body: JSON.stringify(loginData), method: "POST" });
    const data: { token: string; msg: string } = await req.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  };
  return (
    <div>
      <Input
        placeholder="Who Are You?"
        value={loginData.username}
        onChange={(e) => setLoginData((state) => ({ ...state, username: e.target.value }))}
      />
      <Input
        type="password"
        placeholder="Ur key Word"
        value={loginData.password}
        onChange={(e) => setLoginData((state) => ({ ...state, password: e.target.value }))}
      />
      <Button onClick={submitRequest}> Submit</Button>
    </div>
  );
};
export default Home;
