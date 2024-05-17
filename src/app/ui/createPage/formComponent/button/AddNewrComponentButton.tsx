'use client';
import { addFormElement } from '@/src/lib/feature/formDataSlice';
import { useAppDispatch } from '@/src/lib/RThooks';
import styled from 'styled-components';

const SideBarButton = styled.button`
  color: black;
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  position: relative;
  justify-self: center;
  align-self: center;
  display: block;
  .button-mask {
    display: none;
    width: 100%;
    height: 100%;
    background-color: #a8a8a8a8;
    z-index: 20;
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 8px;
    color: white;
    align-items: center;
    text-align: center;
    padding: 4px;
  }
  &:hover {
    .button-mask {
      display: flex;
    }
  }

  &:active {
    .button-mask {
      background-color: #8d8d8da8;
    }
  }
`;

export default function AddNewComponentButton({
  children,
  componentType,
  description,
  count = 1,
}: Readonly<{
  children: React.ReactNode;
  componentType: string;
  description: string;
  count?: number;
}>) {
  const dispatch = useAppDispatch();
  const handleAddComponent = () => {
    const id = `${componentType}_${Date.now()}`;

    // 用於產生預設的n個子元素
    const randomValuesArray = new Uint8Array(count);
    crypto.getRandomValues(randomValuesArray);
    const childrenList: { [key: string]: {} } = {};
    Array.from(randomValuesArray).forEach((element) => {
      let childKey: string = element.toString().padStart(16, '0');
      if (childrenList[childKey]) {
        childKey = childKey + 1;
      }
      childrenList[childKey] = {};
    });
    const data = {
      nodeKey: id,
      componentType: componentType,
      componentCount: count,
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
      <div className="button-mask">{description}</div>
    </SideBarButton>
  );
}
