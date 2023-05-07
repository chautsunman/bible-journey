import * as React from 'react';
import { useState, useCallback } from 'react';

import JourneyTypeEditItem from './journey_type_edit_item';

import JourneyType from '../../types/journey_type';

interface JourneyTypeNewItemProps {
  onSave: (journeyType: JourneyType) => void;
}

const JourneyTypeNewItem = (props: JourneyTypeNewItemProps) => {
  const {onSave} = props;

  const [journeyType, setJourneyType] = useState(JourneyType.newEmptyRecord());

  const onSaveBtnClick = useCallback(() => {
    onSave(journeyType);
    setJourneyType(JourneyType.newEmptyRecord());
  }, [onSave, journeyType, setJourneyType]);

  return (
    <JourneyTypeEditItem journeyType={journeyType} setJourneyType={setJourneyType} onSave={onSaveBtnClick}/>
  );
};

export default JourneyTypeNewItem;
