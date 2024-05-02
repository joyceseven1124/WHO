import type { RootState } from '@/src/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
export interface FormElement {
  // position?: string;
  inputText?: string;
  imageURL?: string;
  imageInformation?: string;
  // imageFile?: File;
  linkText?: string;
  linkURL?: string;
  startTimeLine?: string;
  endTimeLine?: string;
  initStartTime?: string;
  initEndTime?: string;
  listTextArray?: (string | undefined)[];
  [key: string]: string | (string | undefined)[] | undefined | null[] | Dayjs;
}
interface ComponentStructure {
  componentType: string;
  componentTitle: string;
  componentCount: number;
  children: { [key: string]: FormElement };
}

interface ImageCollectionType {
  childKey: string;
  nodeKey: string;
  imageFile?: Blob;
}

export interface FormDataList {
  formData: { [key: string]: ComponentStructure };
  imageCollection: ImageCollectionType[];
}

interface editFormElement {
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
  // children: { [key: string]: FormElement };
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
  imageCollection: [],
};

export const formEditSlice = createSlice({
  name: 'editForm',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
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

    editFormElement: (state, action: PayloadAction<editFormElement>) => {
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

    addImageCollection: (state, action: PayloadAction<ImageCollectionType>) => {
      const { nodeKey, childKey, imageFile } = action.payload;
      const data = {
        nodeKey: nodeKey,
        childKey: childKey,
        imageFile: imageFile,
      };
      state.imageCollection.push(data);
    },

    removeImageCollection: (
      state,
      action: PayloadAction<ImageCollectionType>
    ) => {
      const { nodeKey, childKey } = action.payload;
      state.imageCollection = state.imageCollection.filter((element) => {
        return !(element.nodeKey === nodeKey && element.childKey === childKey);
      });
    },
  },
});

export const {
  removeFormElement,
  removeFormChildElement,
  editFormChildElement,
  addFormChildElement,
  addFormElement,
  changeFormChildElement,
  changeFormElement,
  editFormElement,
  addImageCollection,
  removeImageCollection,
} = formEditSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFormData = (state: RootState) => state.FormData.formData;

export default formEditSlice.reducer;
