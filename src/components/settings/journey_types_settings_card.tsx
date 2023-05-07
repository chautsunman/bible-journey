import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

import JourneyTypeListItem from './journey_type_list_item';
import JourneyTypeNewItem from './journey_type_new_item';

import JourneyType from '../../types/journey_type';

interface JourneyTypesSettingsCardProps {
  journeyTypes: JourneyType[];
  onSaveNewJourneyType: (journeyType: JourneyType) => void;
  onSaveJourneyType: (journeyType: JourneyType) => void;
  onDeleteJourneyType: (journeyType: JourneyType) => void;
}

const JourneyTypesSettingsCard = (props: JourneyTypesSettingsCardProps) => {
  const {journeyTypes, onSaveNewJourneyType, onSaveJourneyType, onDeleteJourneyType} = props;

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">Journey Types</Typography>

        <Box sx={{height: '400px', overflow: 'auto'}}>
          <List dense={true}>
            <JourneyTypeNewItem onSave={onSaveNewJourneyType}/>

            {journeyTypes.map((journeyType) => (
              <JourneyTypeListItem
                key={journeyType.id}
                initData={journeyType}
                onSave={onSaveJourneyType}
                onDelete={onDeleteJourneyType}/>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JourneyTypesSettingsCard;
