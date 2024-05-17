'use client';
import { Theme } from '@/src/app/theme';
import { useAppSelector } from '@/src/lib/RThooks';
import { selectFormData } from '@/src/lib/feature/formDataSlice';
import { ReactNode, useContext, useEffect, useState } from 'react';
import {
  ChildKeyContext,
  NodeKeyContext,
} from '../../../../../lib/provider/context';
import DropzoneComponent from './handleImage/DropzoneComponent';
import Thumb from './handleImage/PreviewImage';

export default function ImageComponent({
  styleNodeHeight,
}: {
  styleNodeHeight?: string;
}) {
  const [imageStatus, setImageStatus] = useState(false);
  const [thumb, setThumb] = useState<ReactNode>(null);
  const fileData = useAppSelector(selectFormData);
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
            styleHeight={styleNodeHeight || Theme.portfolioCardHeight}
          />
        );
      } else {
        setImageStatus(false);
        setThumb(null);
      }
    }
  }, [childKey, currentComponent, styleNodeHeight]);

  return (
    <>
      {imageStatus ? (
        thumb
      ) : (
        <DropzoneComponent
          styleHeight={styleNodeHeight || Theme.portfolioCardHeight}
        />
      )}
    </>
  );
}
