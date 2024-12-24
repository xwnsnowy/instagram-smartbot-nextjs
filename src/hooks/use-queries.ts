import { getAllAutomations } from "@/services/automationService"
import { useQuery } from "@tanstack/react-query"

export const useQueryAutomations = () => { 
  return useQuery(
    {
      queryKey: ["user-automations"],
      queryFn: getAllAutomations,
    }
  )
}