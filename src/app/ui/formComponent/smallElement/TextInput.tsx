'use client';
import styled from 'styled-components';

const TextInputStyle = styled.input`
  outline: none;
  border-bottom: ${(props) => props.theme.editLine};
  padding: 4px;
  width: 100%;
  font-size: 16px;
`;

export default function TextInput({
  placeholderText,
  textCount,
}: {
  placeholderText: string;
  textCount: number;
}) {
  return (
    <TextInputStyle
      placeholder={placeholderText}
      maxLength={textCount}
      type="text"
    />
  );
}
