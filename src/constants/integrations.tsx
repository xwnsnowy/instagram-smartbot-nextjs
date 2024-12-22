import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: "INSTAGRAM" | "CRM";
};

export const INTEGRATION_CARDS: Props[] = [
  {
    title: "Connect Instagram",
    description:
      "Easily integrate your Instagram account to manage your social media presence, schedule posts, and analyze engagement metrics seamlessly.",
    icon: <InstagramDuoToneBlue />,
    strategy: "INSTAGRAM",
  },
  {
    title: "Connect Salesforce",
    description:
      "Integrate Salesforce to streamline your CRM process, automate sales workflows, and enhance customer relationship management effortlessly.",
    icon: <SalesForceDuoToneBlue />,
    strategy: "CRM",
  },
];
