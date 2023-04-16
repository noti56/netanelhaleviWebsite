// import { Button } from "@/Components/Button";
import { Button } from "@/Components/Button";

import { Input } from "@/Components/Input";

// interface chatProps {
//   msgsProps: string[];
// }
// export async function getServerSideProps() {
//   return {
//     // props: { msgsProps: getMessages() }, // will be passed to the page component as props
//   };
// }

const Home = () => {
  return (
    <div>
      <Input placeholder="Who Are You?" />
      <Input type="password" placeholder="Ur key Word" />
      <Button> Submit</Button>
    </div>
  );
};
export default Home;
