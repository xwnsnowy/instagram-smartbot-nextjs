import { z } from 'zod'
import { useOptimisticMutation, useSimpleMutation } from '@/hooks/use-mutation-data';
import { createNewAutomation, deleteKeyword, saveKeyword, saveListener, saveTrigger, updateAutomationName } from '@/services/automationService';
import { useCallback, useEffect, useRef, useState } from 'react';
import useZodForm from '@/hooks/use-zod-form';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { TRIGGER } from '@/redux/slices/automation';

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

export const useListener = (id: string) => {
  const [listener, setListener] = useState<'MESSAGE' | 'SMARTAI' | null>(null)

  const promptSchema = z.object({
    prompt: z.string().min(1),
    reply: z.string(),
  })

  const { isPending, mutate } = useSimpleMutation({
    mutationKey: ['create-lister'],
    mutationFn: (data: { prompt: string; reply: string }) =>
      saveListener(id, listener || 'MESSAGE', data.prompt, data.reply),
    queryKey: 'automation-info'
  }
  )

  const { errors, onFormSubmit, register, reset, watch } = useZodForm(
    promptSchema,
    mutate
  )

  const onSetListener = (type: 'SMARTAI' | 'MESSAGE') => setListener(type);

  return {
    onSetListener,
    register,
    onFormSubmit,
    listener,
    isPending,
    errors,
    watch,
    reset
  }
}

export const useTriggers = (id: string) => {
  const types = useAppSelector((state) => state.AutomationReducer.trigger?.types)

  // useDispatch là một hook để gửi hành động đến Redux store.
  const dispatch: AppDispatch = useDispatch();

  const onSetTrigger = (type: 'COMMENT' | 'DM') =>
    dispatch(TRIGGER({ type }))

  const { isPending, mutate } = useSimpleMutation(
    {
      mutationKey: ['add-trigger'],
      mutationFn: (data: { types: string[] }) => saveTrigger(id, data.types),
      queryKey: 'automation-info'
    }
  )

  const onSaveTrigger = () => mutate({ types })

  return { types, onSetTrigger, onSaveTrigger, isPending }
}

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState('');
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const { mutate } = useSimpleMutation(
    {
      mutationKey: ['add-keyword'],
      mutationFn: (data: { keyword: string }) => saveKeyword(id, data.keyword),
      queryKey: 'automation-info',
      onSuccess: () => setKeyword('')
    }
  )

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ keyword })
      setKeyword('')
    }
  }

  const { mutate: deleteMutation } = useSimpleMutation(
    {
      mutationKey: ['delete-keyword'],
      mutationFn: (data: { id: string }) => deleteKeyword(data.id),
      queryKey: 'automation-info'
    }
  )

  return { keyword, onValueChange, onKeyPress, deleteMutation }
}