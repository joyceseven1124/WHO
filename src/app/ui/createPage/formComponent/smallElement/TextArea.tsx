'use client';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TextAreaWrapper = styled.div<{
  $styleHeight?: string;
  $styleFontSize?: string;
}>`
  position: relative;
  width: 100%;
  height: fit-content;
  .placeHolder-text {
    position: absolute;
    padding: 10px;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.gray};
    white-space: normal;
    font-size: ${(props) => props.$styleFontSize || '14px'};
  }
`;

const TextAreaStyle = styled.textarea<{
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
`;
export default function TextArea({
  placeholderText,
  textCount,
  styleHeight,
  styleFontSize,
  dispatchFunction,
  value,
}: {
  placeholderText: string;
  textCount: number;
  styleHeight?: string;
  styleFontSize?: string;
  dispatchFunction: (inputValue: string) => void;
  value: any | undefined;
}) {
  const [placeHolderShow, setPlaceHolderShow] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handlePlaceHolder = () => {
    if (placeHolderShow) {
      setPlaceHolderShow(false);
      inputRef.current?.focus();
    }
  };

  const checkInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    if (value === '') {
      setPlaceHolderShow(true);
    }
  };

  useEffect(() => {
    if (value) {
      setPlaceHolderShow(false);
    } else {
      setPlaceHolderShow(true);
    }
  }, [value]);

  return (
    <TextAreaWrapper>
      {placeHolderShow && (
        <div className="placeHolder-text" onClick={handlePlaceHolder}>
          {placeholderText}
        </div>
      )}

      <TextAreaStyle
        maxLength={textCount}
        $styleHeight={styleHeight}
        $styleFontSize={styleFontSize}
        onBlur={checkInputValue}
        onChange={(e) => {
          if (dispatchFunction) {
            dispatchFunction(e.target.value);
          }
        }}
        ref={inputRef}
        value={value ? value : ''}
      />
    </TextAreaWrapper>
  );
}
