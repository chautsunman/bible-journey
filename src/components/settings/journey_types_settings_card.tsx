import * as React from 'react';
import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ChromePicker, ColorChangeHandler } from 'react-color';

import TypeColorBlock from '../type_color_block';

import JourneyType from '../../types/journey_type';

interface JourneyTypesSettingsCardProps {
  journeyTypes: JourneyType[];
  onSaveNewJourneyType: (journeyType: JourneyType) => void;
}

const JourneyTypesSettingsCard = (props: JourneyTypesSettingsCardProps) => {
  const {journeyTypes, onSaveNewJourneyType} = props;

  // TODO: move newJourneyType to outside?
  const [newJourneyType, setNewJourneyType] = useState(JourneyType.newEmptyRecord());
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const onNewJourneyTypeTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const journeyType = newJourneyType.copy();
    journeyType.type = event.target.value;
    setNewJourneyType(journeyType);
  }, [setNewJourneyType, newJourneyType]);

  const openNewJourneyTypeColorPicker = useCallback(() => {
    setColorPickerOpen(true);
  }, [setColorPickerOpen]);

  const closeColorPickerDialog = useCallback(() => {
    setColorPickerOpen(false);
  }, [setColorPickerOpen]);

  const onSetNewJourneyTypeColor: ColorChangeHandler = useCallback((color, event) => {
    const journeyType = newJourneyType.copy();
    journeyType.color = color.hex;
    setNewJourneyType(journeyType);
  }, [setNewJourneyType, newJourneyType]);

  const onSaveNewJourneyTypeClick = useCallback(() => {
    onSaveNewJourneyType(newJourneyType);
    setNewJourneyType(JourneyType.newEmptyRecord());
  }, [onSaveNewJourneyType, newJourneyType, setNewJourneyType]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">Journey Types</Typography>

        <Box sx={{height: '400px', overflow: 'auto'}}>
          <List dense={true}>
            <ListItem
              secondaryAction={
                <IconButton onClick={onSaveNewJourneyTypeClick} edge="end" aria-label="delete">
                  <CheckIcon />
                </IconButton>
              }>
              <ListItemText primary={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <FormControl sx={{flex: '1 1 auto'}}>
                    <TextField value={newJourneyType.type} onChange={onNewJourneyTypeTextChange} label="New Journey Type" variant="outlined" size="small"/>
                  </FormControl>
                  <Box sx={{flex: '0 0 16px'}}/>
                  <Box sx={{flex: '0 0 auto'}}>
                    <TypeColorBlock color={newJourneyType.color} onClick={openNewJourneyTypeColorPicker}/>
                  </Box>
                  <Box sx={{flex: '0 0 16px'}}/>
                </Box>
              }/>
            </ListItem>

            {journeyTypes.map((journeyType) => (
              <ListItem
                key={journeyType.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }>
                <ListItemText primary={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{flex: '0 0 auto'}}>{journeyType.type}</Box>
                    <Box sx={{flex: '0 0 4px'}}/>
                    <Box sx={{flex: '0 0 auto'}}>
                      <TypeColorBlock color={journeyType.color}/>
                    </Box>
                  </Box>
                }/>
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>

      <Dialog open={colorPickerOpen}>
        <DialogTitle>Pick a color</DialogTitle>
        <DialogContent>
          <ChromePicker color={newJourneyType.color} onChangeComplete={onSetNewJourneyTypeColor}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeColorPickerDialog}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default JourneyTypesSettingsCard;
