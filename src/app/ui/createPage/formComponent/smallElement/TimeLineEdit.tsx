'use client';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/context';
import {
  editFormChildElement,
  removeFormChildElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { TimeHTMLAttributes, useContext, useState } from 'react';
import styled from 'styled-components';
import DeleteButton from '../button/DeleteButton';
import TextArea from './TextArea';

const TimeLineEditWrapper = styled.div`
  display: flex;
  column-gap: 20px;
  align-items: flex-start;
`;
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

const HorizontalLine = styled.div`
  height: 1px;
  width: 50px;
  background-color: ${(props) => props.theme.gray};
`;

const materialTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black', // Customize border color on focus
            color: 'black',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Default color
          '&.Mui-focused': {
            color: 'black', // Label color when input is focused
          },
        },
      },
    },
  },
});

export default function TimeLineEdit() {
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const dispatch = useAppDispatch();
  const formList = useAppSelector(selectFormData);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-04'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-04'));
  const { getInputValue, handleTextAreaDispatch } =
    useTextAreaInputValue(childKey);
  // const nodeKey = useContext(NodeKeyContext);

  const inputValue = getInputValue();

  const getTimeValue = () => {
    let time: { initStartTime?: Dayjs | null; initEndTime?: Dayjs | null } = {};
    if (formList[nodeKey]?.children[childKey]?.initStartTime) {
      time['initStartTime'] = dayjs(
        formList[nodeKey].children[childKey].initStartTime
      );
    } else {
      time['initStartTime'] = null;
    }

    if (formList[nodeKey]?.children[childKey]?.initEndTime) {
      time['initEndTime'] = dayjs(
        formList[nodeKey].children[childKey].initEndTime
      );
    } else {
      time['initEndTime'] = null;
    }

    return time;
  };

  const { initStartTime, initEndTime } = getTimeValue();

  const handleDateChange = (timeType: string, time: any) => {
    // Extract month name and year from the selected date
    const monthName = time?.locale('en').format('MMMM'); // Get month name in English
    const year = time?.year();
    let timeResult;
    if (timeType === 'startTime') {
      timeResult = {
        initStartTime: time.toISOString(),
        startTimeLine: `${year}-${monthName}`,
      };
    } else {
      timeResult = {
        initEndTime: time.toISOString(),
        endTimeLine: `${year}-${monthName}`,
      };
    }
    dispatch(
      editFormChildElement({
        nodeKey: nodeKey,
        childKey: childKey,
        elements: timeResult,
      })
    );
  };

  return (
    <TimeLineEditWrapper>
      <DecorativeElementsWrapper className="text-black">
        <Circle />
        <VerticalLine />
      </DecorativeElementsWrapper>
      <div className="grid w-full grid-cols-[auto,40px] items-center gap-x-2">
        <div className="flex flex-col gap-y-2">
          <ThemeProvider theme={materialTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['MuiDatePicker', 'MuiDatePicker']}>
                <div className="mb-4 flex items-center gap-x-2">
                  <MuiDatePicker
                    label='"起始年月份選取"'
                    value={initStartTime ?? dayjs()}
                    onChange={(time) => {
                      handleDateChange('startTime', time);
                    }}
                    views={['month', 'year']}
                  />
                  <HorizontalLine />
                  <MuiDatePicker
                    label='"結束年月份選取"'
                    value={initEndTime ?? dayjs()}
                    onChange={(time) => {
                      handleDateChange('endTime', time);
                    }}
                    views={['month', 'year']}
                  />
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </ThemeProvider>
          <TextArea
            placeholderText={'填寫經歷文字'}
            textCount={50}
            styleHeight={'90px'}
            value={inputValue}
            dispatchFunction={handleTextAreaDispatch}
          />
        </div>
        <div
          className=" w-10"
          onClick={() => {
            dispatch(
              removeFormChildElement({ nodeKey: nodeKey, childKey: childKey })
            );
          }}
        >
          <DeleteButton />
        </div>
      </div>
    </TimeLineEditWrapper>
  );
}
