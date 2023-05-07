import * as React from 'react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ChromePicker, ColorChangeHandler } from 'react-color';

import TypeColorBlock from '../type_color_block';

import JourneyType from '../../types/journey_type';

interface JourneyTypeEditItemProps {
  journeyType: JourneyType;
  setJourneyType: (journeyType: JourneyType) => void;
  onSave: () => void;
}

const JourneyTypeEditItem = (props: JourneyTypeEditItemProps) => {
  const {journeyType, setJourneyType, onSave} = props;

  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const onTextChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newJourneyType = journeyType.copy();
    newJourneyType.type = event.target.value;
    setJourneyType(newJourneyType);
  }, [setJourneyType, journeyType]);

  const openColorPickerDialog = useCallback(() => {
    setColorPickerOpen(true);
  }, [setColorPickerOpen]);

  const closeColorPickerDialog = useCallback(() => {
    setColorPickerOpen(false);
  }, [setColorPickerOpen]);

  const onSetColor: ColorChangeHandler = useCallback((color, event) => {
    const newJourneyType = journeyType.copy();
    newJourneyType.color = color.hex;
    setJourneyType(newJourneyType);
  }, [setJourneyType, journeyType]);

  const onSaveBtnClick = useCallback(() => {
    onSave();
  }, [onSave]);

  return (
    <Box>
      <ListItem
        secondaryAction={
          <IconButton onClick={onSaveBtnClick} edge="end" aria-label="delete">
            <CheckIcon />
          </IconButton>
        }>
        <ListItemText primary={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <FormControl sx={{flex: '1 1 auto'}}>
              <TextField value={journeyType.type} onChange={onTextChange} label="Journey Type" variant="outlined" size="small"/>
            </FormControl>
            <Box sx={{flex: '0 0 16px'}}/>
            <Box sx={{flex: '0 0 auto'}}>
              <TypeColorBlock color={journeyType.color} onClick={openColorPickerDialog}/>
            </Box>
            <Box sx={{flex: '0 0 16px'}}/>
          </Box>
        }/>
      </ListItem>

      <Dialog open={colorPickerOpen}>
        <DialogTitle>Pick a color</DialogTitle>
        <DialogContent>
          <ChromePicker color={journeyType.color} onChangeComplete={onSetColor}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeColorPickerDialog}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JourneyTypeEditItem;
