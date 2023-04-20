// import { Button } from "@/Components/Button";
import { Button } from "@/Components/Button";

import { SocketClient } from "@/SocketClient";
import { randomUUID } from "crypto";
import { KeyboardEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { getMessages } from "./api/messages";
import { Input } from "@/Components/Input";

interface chatProps {
  msgsProps: string[];
}
export async function getServerSideProps() {
  return {
    props: { msgsProps: getMessages() }, // will be passed to the page component as props
  };
}

const Home = ({ msgsProps }: chatProps) => {
  const initSocket = async () => {
    return await fetch("/api/socket");
  };

  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [someoneTyping, setSomeoneTyping] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setMessages(msgsProps);
      await initSocket();

      SocketClient.getInstance().on("connect", () => {
        console.log("Socket for chat is connected");
      });
      SocketClient.getInstance().on("message-get", (msgs: string[]) => {
        setMessages(msgs);
      });
      SocketClient.getInstance().on("typing", () => {
        setSomeoneTyping(true);
      });
      SocketClient.getInstance().on("stop-typing", () => {
        setSomeoneTyping(false);
      });
    })();
  }, [msgsProps, setMessages]);

  //   SocketClient.getInstance().on("update-input", (msg) => {
  //     console.log(msg);
  //   });

  const emitInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    SocketClient.getInstance().emit("typing", e.currentTarget.value);
    setInputValue(e.currentTarget.value);
  };

  const onMessageSend = () => {
    SocketClient.getInstance().emit("message-send", inputValue);
    setInputValue("");
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code !== "Enter") return;
    onMessageSend();
  };

  return (
    <MessagesView>
      <MessagesList>
        {someoneTyping ? "Someone is Typing!" : ""}
        {messages.map((msg, i) => (
          <MessagesItem key={i}>{msg}</MessagesItem>
        ))}
      </MessagesList>
      <InputAndButton>
        <Input
          onKeyDown={onKeyDown}
          placeholder="enter message"
          type="text"
          value={inputValue}
          onChange={emitInputChange}
        />
        <Button onClick={onMessageSend}>Send</Button>
      </InputAndButton>
    </MessagesView>
  );
};
export default Home;

const MessagesView = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InputAndButton = styled.div`
  display: flex;
`;
const MessagesList = styled.ul`
  list-style: none;
  /* padding: 0; */
  height: 100%;
  /* width: 100%; */
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MessagesItem = styled.li`
  /* margin: 5px; */
  font-size: large;
`;
