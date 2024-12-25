import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseMutationDataProps {
  mutationKey: MutationKey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: MutationFunction<any, any>;
  queryKey?: string;
  onSuccess?: () => void;
}

//quản lý các mutation (thao tác thay đổi dữ liệu)
export const useMutationData = ({
  mutationKey,
  mutationFn,
  queryKey,
  onSuccess,
}: UseMutationDataProps) => {
  //query client giúp truy cập và quản lý cache của React Query.
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) onSuccess()
      return toast(data?.status === 200 ? "Success" : "Error", {
        description: data?.message,
      })
    },
    // onSettled được gọi sau khi mutation kết thúc (dù thành công hay thất bại). Trong hàm này, queryClient.invalidateQueries sẽ làm mới các query được xác định bởi queryKey
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  })

  return { mutate, isPending }
}

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

  const lastestVariable = data[data.length - 1]
  return { lastestVariable }
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
