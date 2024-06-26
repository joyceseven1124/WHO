import styled from 'styled-components';

const TitleContainer = styled.h2`
  font-size: 30px;
  color: black;
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.gray};
`;

const Line = styled.div`
  width: 60%;
  height: 1px;
  background-color: ${(props) => props.theme.gray};
`;

const BottomLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export default function ViewTitle({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children ? (
    <TitleWrapper>
      <TitleContainer>{children}</TitleContainer>
      <BottomLine>
        <Circle />
        <Line />
        <Circle />
      </BottomLine>
    </TitleWrapper>
  ) : (
    <></>
  );
}
