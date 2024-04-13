'use client';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import DeleteButton from '../button/DeleteButton';
import EditButton from '../button/EditPictureButton';
import CropImageComponent from './CropImageComponent';

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
    #hoverDialog {
      display: block;
    }
  }
`;

const HoverStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3f3f3fd3;
  color: white;
  position: absolute;
  top: 0px;
  padding: 10px;
  text-align: center;
  display: none;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ButtonsDialog = styled.div`
  display: flex;
  height: 50%;
  align-items: end;
  justify-content: center;
`;

const CropImageWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 30;
  left: 0px;
  top: 0px;
  background-color: #00000034;
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
  const [openCrop, setOpenCrop] = useState(false);
  return (
    <>
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
        <HoverStyle id="hoverDialog">
          <ButtonsDialog id="buttonDialog">
            <DeleteButton iconTailwindColor="text-white"></DeleteButton>
            <EditButton
              iconTailwindColor="text-white"
              setCrop={setOpenCrop}
            ></EditButton>
          </ButtonsDialog>
          <p>{imageInformation}</p>
        </HoverStyle>
      </ThumbStyle>
      {openCrop && (
        <CropImageWrapper className="">
          <CropImageComponent
            imageURL={imageURL}
            setOpenCrop={setOpenCrop}
            openCrop={openCrop}
          />
        </CropImageWrapper>
      )}
    </>
  );
}
