'use client';
import styled from 'styled-components';

const TextInputStyle = styled.textarea<{
  $styleHeight?: string;
  $styleFontSize?: string;
}>`
  outline: none;
  border: ${(props) => props.theme.editLine};
  padding: 4px;
  width: 100%;
  height: ${(props) => props.$styleHeight || '250px'};
  font-size: ${(props) => props.$styleFontSize || '14px'};
  line-height: normal;
  resize: none;
  color: black;
  &::placeholder {
    /* transform: translateY(-0.5rem); */
    white-space: normal;
    font-size: ${(props) => props.$styleFontSize || '14px'};
  }
`;

export default function TextInput({
  placeholderText,
  textCount,
  styleHeight,
  styleFontSize,
}: {
  placeholderText: string;
  textCount: number;
  styleHeight?: string;
  styleFontSize?: string;
}) {
  return (
    <TextInputStyle
      placeholder={placeholderText}
      maxLength={textCount}
      $styleHeight={styleHeight}
      $styleFontSize={styleFontSize}
    />
  );
}
