'use client';
import { addFormElement } from '@/src/lib/feature/formDataSlice';
import { useAppDispatch } from '@/src/lib/hooks';
import styled from 'styled-components';

const SideBarButton = styled.button`
  color: black;
`;

export default function SideBarComponentButton({
  children,
  componentType,
}: Readonly<{
  children: React.ReactNode;
  componentType: string;
}>) {
  const dispatch = useAppDispatch();
  const handleAddComponent = () => {
    const id = `${componentType}_${Date.now()}`;

    // 用於產生預設的12個子元素
    const randomValuesArray = new Uint8Array(12);
    crypto.getRandomValues(randomValuesArray);
    const childrenList: { [key: string]: {} } = {};
    Array.from(randomValuesArray).forEach((element) => {
      const childKey: string = element.toString(16).padStart(16, '0');
      childrenList[childKey] = {};
    });
    const data = {
      nodeKey: id,
      componentType: componentType,
      children: childrenList,
    };
    dispatch(addFormElement(data));
  };
  return (
    <SideBarButton
      type="button"
      className={componentType}
      onClick={() => {
        handleAddComponent();
      }}
    >
      {children}
    </SideBarButton>
  );
}
