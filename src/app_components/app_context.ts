import SettingsService from "../services/settings_service";
import JourneyService from "../services/journey_service";
import ColorsService from "../services/colors_service";

class AppContext {
  settingsService: SettingsService;
  journeyService: JourneyService;
  colorsService: ColorsService;

  constructor(uid: string, settingsService: SettingsService, journeyService: JourneyService, colorsService: ColorsService) {
    this.settingsService = settingsService;
    this.journeyService = journeyService;
    this.colorsService = colorsService;

    this.settingsService.init(uid);
    this.journeyService.init(uid);
    this.colorsService.init(uid);
  }
}

export default AppContext;
