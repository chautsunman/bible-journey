import SettingsService from "../services/settings_service";
import JourneyService from "../services/journey_service";

class AppContext {
  settingsService: SettingsService;
  journeyService: JourneyService;

  constructor(uid: string, settingsService: SettingsService, journeyService: JourneyService) {
    this.settingsService = settingsService;
    this.journeyService = journeyService;

    this.settingsService.init(uid);
    this.journeyService.init(uid);
  }
}

export default AppContext;
