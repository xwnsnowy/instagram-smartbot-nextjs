import { getAllAutomations, getAutomationInfo } from "@/services/automationService";
import { onUserInfo } from "@/services/userService"
import { QueryClient, QueryFunction } from "@tanstack/react-query"

const prefetch = async (
  client: QueryClient,
  action: QueryFunction,
  key: string
) => {
  return await client.prefetchQuery({
    queryKey: [key],
    queryFn: action,
    staleTime: 1000 * 60,
  })
}

export const prefetchUserData = async (client: QueryClient) => {
  await prefetch(client, onUserInfo, "user-profile");
  await prefetch(client, getAllAutomations, "user-automations");
};

export const prefetchUserAutomation = async (
  client: QueryClient,
  automationId: string
) => {
  return await prefetch(client, () => getAutomationInfo(automationId), "automation-info");
}

