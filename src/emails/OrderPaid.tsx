import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderPaidEmailProps {
  OrderNumber: string;
  OrderDate: string;
  OrderStatus: string;
  Name: string;
  Address: string;
  City: string;
  ZipCode: string;
  PhoneModel: string;
  CaseType: string;
  Finish: string;
}

export default function OrderPaid({
  OrderNumber,
  OrderDate,
  OrderStatus,
  Name,
  Address,
  City,
  ZipCode,
  PhoneModel,
  CaseType,
  Finish,
}: OrderPaidEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your custom phone case has been paid and will be shipped shortly.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>
            Case<span style={span}>Maker</span>
          </Text>
          <Text style={paragraph}>
            Your custom phone case has been paid and will be shipped shortly.
          </Text>
          <Hr style={hr} />

          <Row style={{ display: "inline-flex" }}>
            <Column style={{ width: "130px" }}>
              <Text>
                <strong>Order ID</strong>
              </Text>
              <Text>{OrderNumber}</Text>
            </Column>
            <Column style={{ width: "130px" }}>
              <Text>
                <strong>Order Date</strong>
              </Text>
              <Text>{OrderDate}</Text>
            </Column>
            <Column>
              <Text>
                <strong>Order Status</strong>
              </Text>
              <Text>{OrderStatus}</Text>
            </Column>
          </Row>
          <Hr style={hr} />
          <Section>
            <Text style={paragraph}>
              <strong>Shipping to: {Name}</strong>
            </Text>
            <Text>
              {Address}, {City}, {ZipCode}
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={paragraphSmall}>
            <strong>Configuration details</strong>
          </Text>
          <Text style={paragraphSmall}>Phone model: {PhoneModel}</Text>
          <Text style={paragraphSmall}>Case type: {CaseType}</Text>
          <Text style={paragraphSmall}>Finish: {Finish}</Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/my-configurations`}
            >
              View your case
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Please contact us if you have any questions. (If you reply to this
            email, we won&apos;t be able to see it.){" "}
          </Text>
          <Text style={footer}>© 2024 CaseMaker</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const span = {
  color: "#e11d48",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  fontSize: "24px",
  fontWeight: "bold",
  lineHeight: "26px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const paragraphSmall = {
  fontSize: "16px",
  lineHeight: "14px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#e11d48",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "10px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
