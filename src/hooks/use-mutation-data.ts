import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseMutationDataProps {
  mutationKey: MutationKey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: MutationFunction<any, any>;
  queryKey?: string;
  onSuccess?: () => void;
}

export const useSimpleMutation = ({
  mutationKey,
  mutationFn,
  queryKey,
  onSuccess,
}: UseMutationDataProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) onSuccess()
      return toast(data?.status === 200 ? 'Success' : 'Error', {
        description: data.data,
      })
    },
    onError: (error) => { return toast('Error', { description: error.message }); },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })

  return { mutate, isPending }
}

// Quản lý các mutation (thao tác thay đổi dữ liệu)
export const useOptimisticMutation = ({
  mutationKey,
  mutationFn,
  queryKey,
  onSuccess,
}: UseMutationDataProps) => {
  // QueryClient giúp truy cập và quản lý cache của React Query
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    // Thực hiện optimistic updates
    onMutate: async (newData) => {
      // Hủy các query liên quan để tránh xung đột
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      // Lưu lại dữ liệu cũ trong trường hợp rollback
      const previousData = queryClient.getQueryData([queryKey]);

      // Cập nhật cache với dữ liệu mới ngay lập tức mà không chờ phản hồi từ server
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData?.data) return { data: [newData] }; // Nếu cache rỗng, thêm dữ liệu mới
        return {
          ...oldData, // Giữ lại các metadata khác
          data: [newData, ...oldData.data], // Chèn dữ liệu mới vào đầu danh sách
        };
      });

      // Trả lại dữ liệu cũ để sử dụng nếu cần rollback
      return { previousData };
    },
    onError: (err, newData, context) => {
      // Khôi phục dữ liệu cũ nếu mutation thất bại
      if (context?.previousData) {
        queryClient.setQueryData([queryKey], context.previousData);
      }
      toast.error("Mutation failed");
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
      toast.success(data?.status === 200 ? "Success" : "Error", {
        description: data?.message,
      });
    },
    // Làm mới query sau khi mutation hoàn tất
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { mutate, isPending };
};

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: {
      mutationKey,
    },
    select: (mutation) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      }
    }
  })

  const latestVariable = data[data.length - 1]
  return { latestVariable }
}

// export const useMutationData = ({
//   mutationKey,
//   mutationFn,
//   queryKey,
//   onSuccess,
// }: UseMutationDataProps) => {
// Query client giúp truy cập và quản lý cache của React Query.
// const queryClient = useQueryClient();

// const { mutate, isPending } = useMutation({
//   mutationKey,
//   mutationFn,
// onMutate được gọi ngay trước khi mutation bắt đầu
// onMutate: async (newData) => {
//   await queryClient.cancelQueries({ queryKey: [queryKey] });

//   const previousData = queryClient.getQueryData([queryKey]);

// Optimistically cập nhật dữ liệu trên client
// queryClient.setQueryData([queryKey], (old: any) => ({
//   ...old,
// Giả sử rằng old là một đối tượng hoặc mảng và ta sẽ cập nhật với newData
//     ...(Array.isArray(old) ? [...old, newData] : newData),
//   }));

//   return { previousData };
// },
// onSuccess: (data) => {
//   if (onSuccess) onSuccess();
//   toast(data?.status === 200 ? "Success" : "Error", {
//     description: data?.message,
//   });
// },
// onError được gọi nếu mutation thất bại
// onError: (error, newData, context) => {
// Rollback dữ liệu về trạng thái trước đó
//   queryClient.setQueryData([queryKey], context.previousData);
//   toast("Error", {
//     description: error.message,
//   });
// },
// onSettled được gọi sau khi mutation kết thúc (dù thành công hay thất bại)
// onSettled: async () => {
// Làm mới các query liên quan sau khi mutation hoàn tất
//       return await queryClient.invalidateQueries({ queryKey: [queryKey] });
//     },
//   });

//   return { mutate, isPending };
// };
