import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SSM,
} from '@/src/app/style';
import styled from 'styled-components';

export const PortfolioCardListWrapperStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 20px;
  row-gap: 20px;

  ${MEDIA_QUERY_SSM} {
    grid-template-columns: 1fr 1fr;
  }

  ${MEDIA_QUERY_MD} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  ${MEDIA_QUERY_LG} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const PortfolioCardStyle = styled.div`
  color: black;
  display: block;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

export const TimeLineWrapper = styled.div`
  display: flex;
  column-gap: 20px;
  align-items: flex-start;
`;
export const TimeLineHorizontalLine = styled.div`
  height: 1px;
  width: 50px;
  background-color: ${(props) => props.theme.gray};
`;

export const TimeLineDataStyle = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const ListPointerWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  column-gap: 10px;
  word-wrap: break-word;
  word-break: break-all;
  .point {
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.circleColor};
  }
`;

export const ListPointerBoardStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 20px;
  row-gap: 20px;
  ${MEDIA_QUERY_MD} {
    grid-template-columns: 1fr 1fr;
  }
  ${MEDIA_QUERY_LG} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const ViewLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;
