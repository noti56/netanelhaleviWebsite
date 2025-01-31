import ThreeScene from "@/Components/ThreeScene";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import natiImg from "../../public/nati.jpg";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #4d90a7;
  display: flex;
  justify-content: space-evenly;
  /* background-image: url("/nati.jpg");
  background-repeat: no-repeat;
  background-position: right;
  background-blend-mode: luminosity;
  background-size: 30%; */
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: end;
`;
const CanvasContianer = styled.div`
  /* width: 100%;
  height: 100%;
  top: 0;
  left: 0; */
  /* position: absolute; */
  width: 40%;
  height: 80%;
`;
const ImageContianer = styled.div`
  display: flex;
  justify-content: right;
`;

const Text = styled.p`
  padding: 0;
  margin: 0;
`;
export default function Home() {
  return (
    <>
      <Head>
        <title>Netanel Halevi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainBox>
        <FlexColumn>
          <Text>היי אני רואה שמצאת את המודעה שלי</Text>
          <Text>
            אז כמו שבטח כבר ראיתם והבנתם, אני מורה פרטי, יש לי ניסיון בלימוד ילדים מבוגרים ונוער
          </Text>
          <Text>אז מצורף באתר זה כל מיני פרטים עליי ומקום ליצירת קשר</Text>

          <Link href={"/leaveDetails"}>ליצירת קשר בתוך האתר</Link>

          <Text>Whatsappp icon</Text>
          <Text>Discord</Text>
          <Text>Gmail</Text>
        </FlexColumn>
        <RightColumn>
          <ImageContianer>
            {/* <Image
              src="/nati.jpg"
              alt="Picture of the author"
              width={100}
              height={100}
              style={{ borderRadius: "20%" }}
            /> */}
          </ImageContianer>
          <CanvasContianer>
            <ThreeScene />
          </CanvasContianer>
        </RightColumn>
      </MainBox>
    </>
  );
}
