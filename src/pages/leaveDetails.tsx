import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";
import PageContainer from "@/Components/PageContainer";
import Toggle from "react-toggle";

import React, { FormEvent, useMemo, useState } from "react";
import styled from "styled-components";
import { Regex } from "@/utills/regex";
import { Label } from "@/Components/Label";

const InputContainer = styled.form`
  direction: rtl;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const ToggleContainer = styled.div`
  justify-self: start;
`;

const LeaveDetails = () => {
  const [name, setName] = useState<string>("");
  const [englishKnowledge, setEnglishKnowledge] = useState<string>("");
  const [knowledge, setKnowledge] = useState<boolean>(false);
  const [extraKnowledgeDetails, setExtraKnowledgeDetails] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const objectToSend: any = useMemo(
    () => ({ name, englishKnowledge, knowledge, extraKnowledgeDetails, phone }),
    [englishKnowledge, extraKnowledgeDetails, knowledge, name, phone]
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      "https://discord.com/api/webhooks/1102567986184855592/NKL4V-KAiFduKljXntHp1r1-X8b3D_FfXxGXgLV53v7PxCyFhninAWjRnEBt-lQgHBUw",
      {
        body: JSON.stringify({
          content: "Arrived a new lead to Netanel teaching",
          // custom embed fields: bold title/name, normal content/value below title
          // - located below description, above image.
          embeds: [
            {
              //   description: "description",
              fields: Object.keys(objectToSend).map((key) => ({
                name: key,
                value: objectToSend[key],
              })),
            },
          ],
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    if (res?.ok) {
      // message is sent
    }
  };

  return (
    <PageContainer centerContent>
      <InputContainer onSubmit={onSubmit}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="מה השם שלך ?"
        />
        <Input
          value={englishKnowledge}
          onChange={(e) => setEnglishKnowledge(e.target.value)}
          placeholder="איך הידע שלך באנגלית ?"
        />

        <ToggleContainer>
          <h3 >קיים ידע קודם בתכנות ?</h3>
          <Toggle
            id="toggle"
            onChange={(e) => setKnowledge(e.target.checked)}
            defaultChecked={knowledge}
          />
        </ToggleContainer>

        {knowledge && (
          <Input
            value={extraKnowledgeDetails}
            onChange={(e) => setExtraKnowledgeDetails(e.target.value)}
            placeholder="פרט על הידע"
          />
        )}

        {phone && !Regex.isPhoneNumber.test(phone) && (
          <Label htmlFor="phone">בבקשה רשום מספר טלפון תקין</Label>
        )}
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          placeholder="מספר טלפון ליצירת קשר"
        />

        <Button disabled={!Regex.isPhoneNumber.test(phone)}>שלח</Button>
      </InputContainer>
    </PageContainer>
  );
};

export default LeaveDetails;
