import type { RootState } from '@/src/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import { fetchWhoFormThunkById } from '../actions/whoFormThunkActions';

export interface SelfInformationType {
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  userIntroduction?: string;
  gitHub?: string;
  linkedIn?: string;
  facebook?: string;
  instagram?: string;
  otherUrl?: string;
}
export interface FormElement {
  inputText?: string;
  imageURL?: string;
  imageInformation?: string;
  linkText?: string;
  linkURL?: string;
  startTimeLine?: string;
  endTimeLine?: string;
  initStartTime?: string;
  initEndTime?: string;
  listTextArray?: (string | undefined)[];
  [key: string]: string | (string | undefined)[] | undefined | null[] | Dayjs;
}
export interface ComponentStructure {
  componentType: string;
  componentTitle: string;
  componentCount: number;
  children: { [key: string]: FormElement };
}
export interface FormDataList {
  formData: { [key: string]: ComponentStructure };
  selfInformation: SelfInformationType;
}

interface EditFormElement {
  nodeKey: string;
  componentTitle: string;
}
export interface FormPayload {
  nodeKey: string;
  childKey: string;
  elements?: FormElement;
}

export interface FormInitPayload {
  nodeKey: string;
  componentType: string;
  componentCount: number;
  children: { [key: string]: FormElement };
}

export interface ChangePositionChildPayload {
  nodeKey: string;
  childrenPositionArray: string[] | [];
}

export interface ChangePositionPayload {
  elementKeyArray: { [key: string]: ComponentStructure };
}

interface RemovePayload {
  nodeKey: string;
  childKey?: string;
}

// Define the initial state using that type
const initialState: FormDataList = {
  formData: {},
  selfInformation: {},
};

export const formEditSlice = createSlice({
  name: 'editForm',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    editSelfInformation: (
      state,
      action: PayloadAction<Partial<SelfInformationType>>
    ) => {
      state.selfInformation = {
        ...state.selfInformation,
        ...(action.payload as SelfInformationType),
      };
    },

    addFormElement: (state, action: PayloadAction<FormInitPayload>) => {
      const { nodeKey, componentType, children, componentCount } =
        action.payload;
      state.formData[nodeKey] = {
        ...state.formData[nodeKey],
        componentType: componentType,
        componentCount: componentCount,
        children: children,
      };
    },

    removeFormElement: (state, action: PayloadAction<RemovePayload>) => {
      const nodeKey = action.payload.nodeKey;
      delete state.formData[nodeKey];
    },

    changeFormElement: (
      state,
      action: PayloadAction<ChangePositionPayload>
    ) => {
      const { elementKeyArray } = action.payload;
      state.formData = { ...elementKeyArray };
    },

    editFormElement: (state, action: PayloadAction<EditFormElement>) => {
      const { nodeKey, componentTitle } = action.payload;
      state.formData[nodeKey]['componentTitle'] = componentTitle;
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
      action: PayloadAction<ChangePositionChildPayload>
    ) => {
      const { nodeKey, childrenPositionArray } = action.payload;

      if (state.formData[nodeKey]) {
        const newDataList: any = {};
        const oldData = state.formData[nodeKey]['children'];
        childrenPositionArray.map((element: string) => {
          newDataList[element] = oldData[element];
        });
        state.formData[nodeKey]['children'] = newDataList;
      }
    },

    addFormChildElement: (state, action: PayloadAction<FormPayload>) => {
      const { nodeKey, childKey } = action.payload;
      if (state.formData[nodeKey]) {
        state.formData[nodeKey]['children'][childKey] = {};
      }
    },

    initializeFormData: (state) => {
      state.formData = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWhoFormThunkById.fulfilled, (state, action) => {
        if (action.payload) {
          const { formData, selfInformation } = action.payload.data;
          console.log('我的表單資料', formData);
          if (formData) state.formData = formData;
          if (selfInformation) state.selfInformation = selfInformation;
        } else {
          state.formData = {};
          state.selfInformation = {};
        }
      })
      .addCase(fetchWhoFormThunkById.rejected, (state, action) => {
        console.log('錯誤thunk whoform');
      });
  },
});

export const {
  editSelfInformation,
  removeFormElement,
  removeFormChildElement,
  editFormChildElement,
  addFormChildElement,
  addFormElement,
  changeFormChildElement,
  changeFormElement,
  editFormElement,
  initializeFormData,
} = formEditSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFormData = (state: RootState) => state.FormData.formData;
export const selectSelfInformation = (state: RootState) =>
  state.FormData.selfInformation;

export default formEditSlice.reducer;
