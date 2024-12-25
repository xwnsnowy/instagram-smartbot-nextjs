import { useMutationData } from '@/hooks/use-mutation-data';
import { createNewAutomation } from '@/services/automationService'; // Đảm bảo hàm này được import đúng

export const useCreateAutomation = (id?: string) => {
  const { mutate, isPending } = useMutationData({
    mutationKey: ['create-automation'],
    mutationFn: () => createNewAutomation(id),
    queryKey: 'user-automations',
  });

  return { mutate, isPending };
};
