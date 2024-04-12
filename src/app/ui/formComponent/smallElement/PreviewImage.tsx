'use client';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import DeleteButton from '../button/DeleteButton';
import EditButton from '../button/EditPictureButton';
import CropImageComponent from './CropImage';

const ThumbStyle = styled.div<{ $styleHeight?: string }>`
  display: 'inline-flex';
  border-radius: '2px';
  border: '1px solid #eaeaea';
  width: '100%';
  height: ${(props) => props.$styleHeight || '150px'};
  object-fit: 'cover';
  padding: '4px';
  box-sizing: 'border-box';
  position: relative;
  img {
    height: 100%;
    object-fit: cover;
    border-radius: '2px';
  }
  &:hover {
    #buttonDialog {
      display: flex;
    }
  }
`;

const ButtonsDialog = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #3f3f3fd3;
  align-items: center;
  justify-content: center;
  top: 0px;
`;

export default function Thumb({
  imageURL,
  imageInformation,
  styleHeight,
}: {
  imageURL: string;
  imageInformation: string;
  styleHeight?: string;
}) {
  const [openCrop, setCrop] = useState(false);
  return (
    <ThumbStyle $styleHeight={styleHeight}>
      <Image
        alt={imageInformation}
        src={imageURL}
        width={500}
        height={500}
        // Revoke data uri after image is loaded
        // onLoad={() => {
        //   URL.revokeObjectURL(imageURL);
        // }}
      />
      <ButtonsDialog id="buttonDialog">
        <DeleteButton iconTailwindColor="text-white"></DeleteButton>
        <EditButton
          iconTailwindColor="text-white"
          setCrop={setCrop}
        ></EditButton>
      </ButtonsDialog>
      {openCrop && <CropImageComponent imageURL={imageURL} />}
    </ThumbStyle>
  );
}
