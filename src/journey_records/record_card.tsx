import * as React from 'react';
import { useCallback } from 'react';

import { DateTime } from 'luxon';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import TypeColorBlock from '../components/type_color_block';

import JourneyRecord from '../types/journey_record';

interface RecordCardProps {
  record: JourneyRecord;
  onDeleteRecord: (record: JourneyRecord) => void;
}

const RecordCard = (props: RecordCardProps) => {
  const {record, onDeleteRecord} = props;

  const onDeleteClick = useCallback(() => {
    onDeleteRecord(record);
  }, [record, onDeleteRecord]);

  return (
    <Card sx={{position: 'relative'}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {record.content[0].toString()}
        </Typography>
        <Typography variant="h5" component="div">
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{flex: '0 0 auto'}}>{record.type.type}</Box>
            <Box sx={{flex: '0 0 4px'}}/>
            <Box sx={{flex: '0 0 auto'}}>
              <TypeColorBlock color={record.type.color}/>
            </Box>
          </Box>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`${record.readingDateStart?.toLocaleString(DateTime.DATE_SHORT) ?? 'N/A'} - ${record.readingDateEnd?.toLocaleString(DateTime.DATE_SHORT) ?? 'N/A'}`}
        </Typography>
        <Typography variant="body2">
          {record.text}
        </Typography>
      </CardContent>

      <Stack direction="row" spacing={1} sx={{position: 'absolute', top: 8, right: 8}}>
        <IconButton aria-label="delete" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}

export default RecordCard;
