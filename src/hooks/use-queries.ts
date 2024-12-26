import { getAllAutomations, getAutomationInfo } from "@/services/automationService"
import { useQuery } from "@tanstack/react-query"

// Caching Dữ Liệu:
// React Query tự động lưu trữ cache dữ liệu và sử dụng lại dữ liệu đã được tải, giúp giảm thiểu số lần gọi API và cải thiện hiệu suất.

// Refetch Dữ Liệu Khi Cần:
// React Query tự động làm mới dữ liệu khi cần, hoặc bạn có thể sử dụng các hàm như invalidateQueries để làm mới cache một cách thủ công.
export const useQueryAutomations = () => {
  return useQuery(
    {
      queryKey: ["user-automations"],
      queryFn: getAllAutomations,
    }
  )
}

export const useQueryAutomationById = (id: string) => {
  return useQuery(
    {
      queryKey: ["user-automation", id],
      queryFn: () => getAutomationInfo(id),
    }
  )
}