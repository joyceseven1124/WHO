import styled from 'styled-components';

const DecorativeElementsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: black;
`;
const VerticalLine = styled.div`
  width: 1px;
  height: 180px;
  background-color: black;
`;

export default function TimeLineDecorate() {
  return (
    <DecorativeElementsWrapper className="text-black">
      <Circle />
      <VerticalLine />
    </DecorativeElementsWrapper>
  );
}
