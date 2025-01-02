import { Button } from "@/components/ui/button";
import { useSimpleMutation } from "@/hooks/use-mutation-data";
import { useQueryAutomationById } from "@/hooks/use-queries";
import { ActiveAutomation } from "@/icons/active-automation";
import { activateAutomation } from "@/services/automationService";
import { Loader2 } from "lucide-react";

type Props = {
  id: string;
};

const ActivateAutomationButton = ({ id }: Props) => {
  const { data } = useQueryAutomationById(id);

  const { mutate, isPending } = useSimpleMutation({
    mutationKey: ["activate-automation"],
    mutationFn: (data: { state: boolean }) =>
      activateAutomation(id, data.state),
    queryKey: "automation-info",
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate({ state: !data?.data?.active })}
      className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4"
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ActiveAutomation />}

      <p className="lg:inline hidden">
        {data?.data?.active ? "Disable" : "Activate"}
      </p>
    </Button>
  );
};

export default ActivateAutomationButton;
