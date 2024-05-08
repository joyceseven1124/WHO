'use client';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import {
  editFormChildElement,
  removeFormChildElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import useTextAreaInputValue from '@/src/lib/hooks/useTextAreaInputValue';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useContext } from 'react';
import {
  TimeLineDataStyle,
  TimeLineHorizontalLine,
  TimeLineWrapper,
} from '../../../ComponentStyle';
import DeleteButton from '../button/DeleteButton';
import TextArea from './TextArea';
import TimeLineDecorate from './TimeLineDecorate';

const materialTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
            color: 'black',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'black',
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
  const { getInputValue, handleTextAreaDispatch } =
    useTextAreaInputValue(childKey);

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
    <TimeLineWrapper>
      <TimeLineDecorate />
      <div className="grid w-full grid-cols-[auto,40px] items-center gap-x-2">
        <div className="flex flex-col gap-y-2">
          <ThemeProvider theme={materialTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['MuiDatePicker', 'MuiDatePicker']}>
                <TimeLineDataStyle>
                  <MuiDatePicker
                    label='"起始年月份選取"'
                    value={initStartTime ?? dayjs()}
                    onChange={(time) => {
                      handleDateChange('startTime', time);
                    }}
                    views={['month', 'year']}
                  />
                  <TimeLineHorizontalLine />
                  <MuiDatePicker
                    label='"結束年月份選取"'
                    value={initEndTime ?? dayjs()}
                    onChange={(time) => {
                      handleDateChange('endTime', time);
                    }}
                    views={['month', 'year']}
                  />
                </TimeLineDataStyle>
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
    </TimeLineWrapper>
  );
}
