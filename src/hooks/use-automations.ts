import { useOptimisticMutation, useSimpleMutation } from '@/hooks/use-mutation-data';
import { createNewAutomation, updateAutomationName } from '@/services/automationService';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useCreateAutomation = (id?: string) => {
  const { mutate, isPending } = useOptimisticMutation({
    mutationKey: ['create-automation'],
    mutationFn: () => createNewAutomation(id),
    queryKey: 'user-automations',
  });

  return { mutate, isPending };
};

export const useEditAutomation = (automationId: string) => {

  const [edit, setEdit] = useState(false);
  //inputRef: Tham chiếu đến phần tử input trong DOM. Ban đầu nó được khởi tạo với giá trị null. Khi phần tử input được gắn (mounted), inputRef.current sẽ chứa phần tử DOM đó.
  const inputRef = useRef<HTMLInputElement>(null);
  const enableEdit = useCallback(() => setEdit(true), []);
  const disableEdit = useCallback(() => setEdit(false), []);

  const { isPending, mutate } = useSimpleMutation({
    mutationKey: ['update-automation'],
    mutationFn: (data: { name: string }) =>
      updateAutomationName(automationId, {
        name: data.name
      }),
    queryKey: 'automation-info',
    onSuccess: () => {
      disableEdit();
    },
  });

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node | null)) {
      if (inputRef.current.value !== '') {
        mutate({
          name: inputRef.current.value
        })
      } else {
        disableEdit();
      }
    }
  }, [mutate, disableEdit]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  }
}