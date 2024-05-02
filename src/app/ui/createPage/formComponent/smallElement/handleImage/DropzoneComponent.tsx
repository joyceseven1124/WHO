'use client';
import { useAppDispatch } from '@/src/lib/RThooks';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/context';
import {
  addImageCollection,
  editFormChildElement,
} from '@/src/lib/feature/formDataSlice';
import { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div<{ $styleHeight?: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  height: ${(props) => props.$styleHeight || '150px'};
  justify-content: center;
  cursor: pointer;
`;

export default function DropzoneComponent({
  styleHeight,
}: {
  styleHeight?: string;
}) {
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const dispatch = useAppDispatch();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // const elements: { imageURL: string; imageInformation: string } = {
      //   imageURL: '',
      //   imageInformation: '',
      // };

      acceptedFiles.map((file) => {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        // elements['imageURL'] = URL.createObjectURL(file);
        // elements['imageInformation'] = `${file.name} - ${file.size}`;

        const data = {
          nodeKey: nodeKey,
          childKey: childKey,
          elements: {
            imageURL: URL.createObjectURL(file),
            imageInformation: `${file.name} - ${file.size}`,
          },
        };

        // const image = {
        //   nodeKey: nodeKey,
        //   childKey: childKey,
        //   imageFile: file,
        // };
        // dispatch(addImageCollection(image));

        dispatch(editFormChildElement(data));
      });
    },
    [childKey, dispatch, nodeKey]
  );
  // 這邊depedency 不確定

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    // 5MB
    maxSize: 5242880,
  });

  return (
    <Container
      $styleHeight={styleHeight}
      {...getRootProps({
        $isFocused: { isFocused },
        $isDragAccept: { isDragAccept },
        $isDragReject: { isDragReject },
      })}
    >
      <input {...getInputProps()} data-testid="dropzone-input" />
      {isDragActive ? <p>將照片拖曳至此</p> : <p>請拖曳或點擊要上傳的圖片</p>}
    </Container>
  );
}
