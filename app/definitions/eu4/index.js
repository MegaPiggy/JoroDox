import rawDataTypes from './types/raw_data';
import graphicsTypes from './types/graphics';
import gameDataTypes from './types/game_data';
import localizationTypes from './types/localization';
import userInterfaceTypes from './types/user_interface';
import mapInformationTypes from './types/map_information';
import audioTypes from './types/audio';

import agesSchema from './schemas/ages';
import achievementsSchema from './schemas/achievements';
import advisorTypesSchema from './schemas/advisortypes';
import buildingSchema from './schemas/buildings';
import bookmarkSchema from './schemas/bookmarks';
import cbTypesSchema from './schemas/cb_types';
import churchAspectsSchema from './schemas/church_aspects';
import countryEventsSchema from './schemas/country_events';
import provinceEventsSchema from './schemas/province_events';
import aiPersonalitiesSchema from './schemas/ai_personalities';
import clientStatesSchema from './schemas/client_states';
import historyCountriesSchema from './schemas/history_countries';
import countriesSchema from './schemas/countries';
import countryColorsSchema from './schemas/country_colors';
import countryTagsSchema from './schemas/country_tags';
import cultureGroupsSchema from './schemas/culture_groups';
import culturesSchema from './schemas/cultures';
import customIdeaGroupsSchema from './schemas/custom_idea_groups';
import customIdeasSchema from './schemas/custom_ideas';
import decisionsSchema from './schemas/decisions';



import countryCommands from './schemas/country_commands';
import anywhereCommands from './schemas/anywhere_commands';
import provinceCommands from './schemas/province_commands';
import tradenodeCommands from './schemas/tradenode_commands';


import countryConditions from './schemas/country_conditions';
import scopeFactors from './schemas/scope_factors';
import countryModifiers from './schemas/country_modifiers';
import ruleModifiers from './schemas/rule_modifiers';
import identifiers from './schemas/identifiers';
import specialValues from './schemas/special_values';
import anywhereConditions from './schemas/anywhere_conditions';
import missionConditions from './schemas/mission_conditions';
import provinceConditions from './schemas/province_conditions';
import provinceModifiers from './schemas/province_modifiers';
import tradenodeConditions from './schemas/tradenode_conditions';
import unitConditions from './schemas/unit_conditions';


export default {
  name: 'Europe Universalis 4',
  id: 'eu4',
  types: [].concat(
    rawDataTypes.types,
    graphicsTypes.types,
    gameDataTypes.types,
    localizationTypes.types,
    userInterfaceTypes.types,
    mapInformationTypes.types,
    audioTypes.types,
  ),
  schemas: [
    agesSchema,
    achievementsSchema,
    advisorTypesSchema,
    buildingSchema,
    bookmarkSchema,
    cbTypesSchema,
    churchAspectsSchema,
    countryEventsSchema,
    provinceEventsSchema,
    aiPersonalitiesSchema,
    clientStatesSchema,
    historyCountriesSchema,
    countriesSchema,
    countryColorsSchema,
    countryTagsSchema,
    cultureGroupsSchema,
    culturesSchema,
    customIdeaGroupsSchema,
    customIdeasSchema,
    decisionsSchema,


    specialValues,
    countryCommands,
    anywhereCommands,
    provinceCommands,
    tradenodeCommands,
    countryConditions,
    scopeFactors,
    countryModifiers,
    ruleModifiers,
    identifiers,
    anywhereConditions,
    missionConditions,
    provinceConditions,
    tradenodeConditions,
    unitConditions,
    provinceModifiers
  ]
};
