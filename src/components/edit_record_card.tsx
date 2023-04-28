import * as React from 'react';

import { DateTime } from 'luxon';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import BookChapterPicker from './book_chapter_picker';
import TypeColorBlock from './type_color_block';

import JourneyRecord from '../types/journey_record';
import JourneyType from '../types/journey_type';
import { BookChapter } from '../bible/constants';

interface EditRecordCardProps {
  record: JourneyRecord;
  onChange: (record: JourneyRecord) => void;
  possibleTypes: JourneyType[];
  onSave: () => void;
  onReset: () => void;
}

const EditRecordCard = (props: EditRecordCardProps) => {
  const {record, onChange, possibleTypes, onSave, onReset} = props;

  const onBookChapterChange = (bookChapter: BookChapter) => {
    const newRecord = record.copy();
    newRecord.content = [bookChapter];
    onChange(newRecord);
  }

  const onTypeChange = (event: SelectChangeEvent) => {
    const typeId = event.target.value as string;
    const selectedTypeArr = possibleTypes.filter((possibleType) => possibleType.id === typeId);
    if (!selectedTypeArr.length) {
      return;
    }
    const selectedType = selectedTypeArr[0];
    const newRecord = record.copy();
    newRecord.type = selectedType;
    onChange(newRecord);
  };

  const onStartDateChange = (startDate: DateTime) => {
    const newRecord = record.copy();
    newRecord.readingDateStart = startDate;
    onChange(newRecord);
  }

  const onEndDateChange = (endDate: DateTime) => {
    const newRecord = record.copy();
    newRecord.readingDateEnd = endDate;
    onChange(newRecord);
  }

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRecord = record.copy();
    newRecord.text = event.target.value;
    onChange(newRecord);
  }

  const recordTypeId = !(JourneyType.isInvalid(record.type)) ? record.type.id : '';

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <BookChapterPicker
              bookChapter={(record.content.length) ? record.content[0] : null}
              onBookChapterChange={onBookChapterChange}/>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="edit-record-card-type-label">Type</InputLabel>
              <Select
                labelId="edit-record-card-type-label"
                id="edit-record-card-type-select"
                value={recordTypeId}
                label="Type"
                onChange={onTypeChange}
              >
                {possibleTypes.map((possibleType) => (
                  <MenuItem key={possibleType.id} value={possibleType.id}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <Box sx={{flex: '0 0 auto'}}>{possibleType.type}</Box>
                      <Box sx={{flex: '0 0 4px'}}/>
                      <Box sx={{flex: '0 0 auto'}}>
                        <TypeColorBlock color={possibleType.color}/>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <DatePicker value={record.readingDateStart} onChange={onStartDateChange} label="Start Date"/>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <DatePicker value={record.readingDateEnd} onChange={onEndDateChange} label="End Date" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField value={record.text} onChange={onTextChange} label="Text" variant="outlined"/>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onSave}>Save</Button>
        <Button size="small" onClick={onReset}>Reset</Button>
      </CardActions>
    </Card>
  );
}

export default EditRecordCard;
