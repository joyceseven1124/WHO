import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: grid;
  text-align: center;
  margin: auto;
  margin-bottom: 10px;
  .title {
    color: black;
  }
  .corner-left-decoration {
    justify-self: left;
    border-top: 1px solid black;
    border-left: 1px solid black;
    width: 50px;
    height: 50px;
  }
  .corner-right-decoration {
    justify-self: right;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    width: 50px;
    height: 50px;
  }
`;

export default function FormTitle({ children }: { children: React.ReactNode }) {
  return (
    <TitleWrapper>
      <div className="corner-left-decoration"></div>
      <h2 className="title">{children}</h2>
      <div className="corner-right-decoration"></div>
    </TitleWrapper>
  );
}
