import type { RootState } from '@/src/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface FormElement {
  position?: string;
  inputText?: string;
  imageURL?: string;
  imageInformation?: string;
  linkText?: string;
  linkURL?: string;
}

export interface FormDataList {
  formData: {
    [key: string]: {
      componentType: string;
      children: { [key: string]: FormElement };
    };
  };
}

interface FormPayload {
  nodeKey: string;
  childKey: string;
  elements?: FormElement;
}

interface ChangePositionPayload {
  nodeKey: string;
  children: { [key: string]: FormElement };
}

export interface FormInitPayload {
  nodeKey: string;
  componentType: string;
  children: { [key: string]: FormElement };
}

interface RemovePayload {
  nodeKey: string;
  childKey?: string;
}

// Define the initial state using that type
const initialState: FormDataList = {
  formData: {},
};

export const formEditSlice = createSlice({
  name: 'editForm',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addFormElement: (state, action: PayloadAction<FormInitPayload>) => {
      const { nodeKey, componentType, children } = action.payload;
      state.formData[nodeKey] = {
        ...state.formData[nodeKey],
        componentType: componentType,
        children: children,
      };
    },
    removeFormElement: (state, action: PayloadAction<RemovePayload>) => {
      const nodeKey = action.payload.nodeKey;
      delete state.formData[nodeKey];
    },

    removeFormChildElement: (state, action: PayloadAction<RemovePayload>) => {
      const nodeKey = action.payload.nodeKey;

      if (action.payload.childKey) {
        const childKey = action.payload.childKey;
        delete state.formData[nodeKey]['children'][childKey];
      }
    },

    editFormChildElement: (state, action: PayloadAction<FormPayload>) => {
      const { nodeKey, childKey, elements } = action.payload;
      if (elements) {
        const elementListKey = Object.keys(elements);
        elementListKey.map((elementKey: string) => {
          if (typeof elementKey !== undefined) {
            if (
              state.formData[nodeKey] &&
              state.formData[nodeKey]['children'][childKey]
            ) {
              state.formData[nodeKey]['children'][childKey][
                elementKey as keyof FormElement
              ] = elements[elementKey as keyof FormElement];
            }
          }
        });
      }
    },

    changeFormChildElement: (
      state,
      action: PayloadAction<ChangePositionPayload>
    ) => {
      const { nodeKey, children } = action.payload;
      if (state.formData[nodeKey]) {
        state.formData[nodeKey]['children'] = children;
      }
    },

    addFormChildElement: (state, action: PayloadAction<FormPayload>) => {
      const { nodeKey, childKey } = action.payload;
      if (state.formData[nodeKey]) {
        state.formData[nodeKey]['children'][childKey] = {};
      }
    },
  },
});

export const {
  addFormElement,
  removeFormElement,
  removeFormChildElement,
  editFormChildElement,
  addFormChildElement,
  changeFormChildElement,
} = formEditSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFormData = (state: RootState) => state.FormData.formData;

export default formEditSlice.reducer;
