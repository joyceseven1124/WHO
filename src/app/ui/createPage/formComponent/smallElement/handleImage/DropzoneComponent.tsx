'use client';
import { useAppDispatch } from '@/src/lib/RThooks';
import { uploadCardImageAction } from '@/src/lib/actions/uploadCardImageAction';
import { editFormChildElement } from '@/src/lib/feature/formDataSlice';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
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
  imageInformation,
}: {
  styleHeight?: string;
  imageInformation?: string;
}) {
  const imageSubmitButton = useRef<HTMLButtonElement>(null);
  const imageForm = useRef<HTMLFormElement>(null);
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const [fileName, setFileName] = useState('');
  const hiddenInputImageRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadImageStatus, setUploadImageStatus] = useState(false);

  let imageUrlView = '';
  const initialState = {
    message: null,
    errors: {},
    success: false,
    successImageUrl: '',
  };
  const dispatch = useAppDispatch();
  const [state, formDispatch] = useFormState(
    uploadCardImageAction,
    initialState
  );

  useEffect(() => {
    if (state && state.success && state.successImageUrl) {
      let imageUrlView = state.successImageUrl;

      const data = {
        nodeKey: nodeKey,
        childKey: childKey,
        elements: {
          imageURL: imageUrlView,
          imageInformation: fileName,
        },
      };
      // setUploadImageStatus(true);

      dispatch(editFormChildElement(data));
      setUploadImageStatus(false);
    } else if (state && !state.success && state.message) {
      setErrorMessage(state.message);
    }
  }, [state, childKey, nodeKey, dispatch, fileName]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(acceptedFiles[0]);
      if (hiddenInputImageRef.current)
        hiddenInputImageRef.current.files = dataTransfer.files;

      acceptedFiles.map((file) => {
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setFileName(`${file.name} - ${file.size}`);
        if (imageForm.current?.requestSubmit) {
          setUploadImageStatus(true);
          imageForm.current.requestSubmit();
        }
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
    // 1MB
    maxSize: 1048576,
    onDropRejected: (fileRejections) => {
      if (
        fileRejections.length > 1 ||
        fileRejections.some((f) =>
          f.errors.some((e) => e.code === 'too-many-files')
        )
      ) {
        setErrorMessage('只能上傳一个文件');
      } else {
        setErrorMessage('上傳的文件需1MB以內的圖檔');
      }
    },
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
      <form action={formDispatch} ref={imageForm} id="dropzoneButton">
        <input type="hidden" name="fileName" value={fileName} />
        <input
          type="file"
          name="cardImage"
          style={{ display: 'none' }}
          ref={hiddenInputImageRef}
        />
        <input {...getInputProps()} data-testid="dropzone-input" />
        {errorMessage ? (
          <p className="text-red-600">{errorMessage}</p>
        ) : uploadImageStatus ? (
          <p className="text-green-600">上傳中，請稍等</p>
        ) : isDragActive ? (
          <p>將照片拖曳至此</p>
        ) : (
          <p>請拖曳或點擊要上傳的圖片</p>
        )}
        <button
          type="submit"
          className="hidden"
          ref={imageSubmitButton}
          form="dropzoneButton"
        ></button>
      </form>
    </Container>
  );
}
