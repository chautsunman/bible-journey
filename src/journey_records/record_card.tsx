import * as React from 'react';

import { DateTime } from 'luxon';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TypeColorBlock from '../components/type_color_block';

import JourneyRecord from '../types/journey_record';

interface RecordCardProps {
  record: JourneyRecord;
}

const RecordCard = (props: RecordCardProps) => {
  const {record} = props;

  return (
    <Card>
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
    </Card>
  );
}

export default RecordCard;
