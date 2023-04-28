import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSnackbar } from 'notistack';

import JourneyTypesSettingsCard from './components/settings/journey_types_settings_card';

import Settings from './types/settings';
import JourneyType from './types/journey_type';
import AppContext from './app_components/app_context';
import { Subscriber } from './services/subscription';

interface SettingsPageProps {
  appContext: AppContext;
}

const SettingsPage = (props: SettingsPageProps) => {
  const {settingsService} = props.appContext;

  const { enqueueSnackbar } = useSnackbar();

  const [settings, setSettings] = useState(Settings.newEmptyRecord());

  const onSettingsUpdate: Subscriber<Settings> = useMemo(() => ({
    onData: (data) => {
      console.log('onSettingsUpdate - onData', data);
      setSettings(data);
    }
  }), [setSettings]);

  useEffect(() => {
    settingsService.subscribe(onSettingsUpdate);
    return () => {
      settingsService.unsubscribe(onSettingsUpdate);
    };
  }, [settingsService, onSettingsUpdate]);

  const onNewJourneyType = async (journeyType: JourneyType) => {
    if (!journeyType.isValid()) {
      console.log('onNewJourneyType - invalid journeyType');
      enqueueSnackbar('Invalid new Journey Type', {variant: 'error'});
      return;
    }
    console.log('onNewJourneyType - start');
    const newSettings = settings.copy();
    newSettings.journeyTypes.push(journeyType);
    console.log('onNewJourneyType - saving');
    const res = await settingsService.updateSettings(newSettings);
    console.log('onNewJourneyType - saved', res);
    if (res) {
      enqueueSnackbar('Saved. Page is refreshing.', {variant: 'success'});
    } else {
      console.log('onNewJourneyType - save failed');
      enqueueSnackbar('Saving error.', {variant: 'error'});
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <JourneyTypesSettingsCard journeyTypes={settings.journeyTypes} onSaveNewJourneyType={onNewJourneyType}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
