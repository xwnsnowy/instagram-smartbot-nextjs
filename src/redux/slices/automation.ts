import { duplicateValidation } from '@/lib/utils';
import { InitialStateTriggerProps, TriggerProps } from '@/types/trigger';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const InitialState: InitialStateTriggerProps = {
  trigger: {
    type: undefined,
    keyword: undefined,
    types: [],
    keywords: [],
  },
}

export const AUTOMATION = createSlice({
  name: 'automation',
  initialState: InitialState,
  reducers: {
    TRIGGER: (state, action: PayloadAction<Partial<TriggerProps>>) => {
      const { type } = action.payload;
      if (type) {
        state.trigger.types = duplicateValidation(state.trigger.types, type);
      }
      return state;
    },
  },
})

export const { TRIGGER } = AUTOMATION.actions
export default AUTOMATION.reducer
