import { ComponentStructure, FormDataList } from '../feature/formDataSlice';
export function orderData(data: FormDataList) {
  let NewFormDataList: { [key: string]: ComponentStructure } = {};
  const formDataKeyList = Object.keys(data.formData);
  const orderComponentList = formDataKeyList.map((nodeKey: string) => {
    const formChildData = data.formData[nodeKey].children;
    const childrenKeyList = Object.keys(formChildData);
    const orderChildrenList = childrenKeyList.map((childKey: string) => {
      return {
        childKey: childKey,
        position: formChildData[childKey]['position'],
      };
    });

    orderChildrenList.sort((a, b) => {
      return Number(a.position) - Number(b.position);
    });
    return {
      nodeKey: nodeKey,
      componentPosition: data.formData[nodeKey]['componentPosition'],
      children: orderChildrenList,
    };
  });

  interface orderComponentType {
    nodeKey: string;
    componentPosition: number;
    children: { childKey: string; position: number }[];
  }

  orderComponentList.sort((a, b) => {
    return Number(a.componentPosition) - Number(b.componentPosition);
  });

  orderComponentList.map((element) => {
    const nodeKey = element.nodeKey;
    const childData = data['formData'][nodeKey]['children'];
    NewFormDataList[element.nodeKey] = data['formData'][nodeKey];
    NewFormDataList[element.nodeKey].children = {};
    element.children.map((childElement) => {
      const childKey = childElement.childKey;
      NewFormDataList[element.nodeKey]['children'][childKey] =
        childData[childKey];
    });
  });
  return { formData: NewFormDataList, selfInformation: data.selfInformation };
}
