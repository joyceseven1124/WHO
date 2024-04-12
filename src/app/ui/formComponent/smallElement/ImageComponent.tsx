'use client';
import { useAppSelector } from '@/src/lib/hooks';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { ChildKeyContext, NodeKeyContext } from '../../../../lib/context';
import DropzoneComponent from './DropzoneComponent';
import Thumb from './PreviewImage';

export default function ImageComponent() {
  const [imageStatus, setImageStatus] = useState(false);
  const [thumb, setThumb] = useState<ReactNode>(null);
  const fileData = useAppSelector((state) => state.FormData.formData);
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const currentComponent = fileData[nodeKey]['children'];

  useEffect(() => {
    if (currentComponent && currentComponent[childKey]) {
      const ImageURL = currentComponent[childKey]['imageURL'];
      const ImageInformation = currentComponent[childKey]['imageInformation'];
      if (ImageURL && ImageInformation) {
        setImageStatus(true);
        setThumb(
          <Thumb
            imageURL={ImageURL}
            imageInformation={ImageInformation}
            styleHeight={'200px'}
          />
        );
      }
    }
  }, [childKey, currentComponent]);

  return (
    <>{imageStatus ? thumb : <DropzoneComponent styleHeight={'200px'} />}</>
  );
}
