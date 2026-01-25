export enum Views {
    LEGACY = "legacy",
    BY_LINES = "byLines",
    LINES_BY_MODE = "linesByMode"
}

export enum TransportModes {
    BUS = "BUS",
    METRO = "METRO",
    TRAIN = "TRAIN",
    TRAM = "TRAM",
    FERRY = "FERRY",
    LIGHT_RAILWAY = "light_railway"
}

export const SupportedLanguages = [
    'sv-SE',
    'en-EN',
    'fr-FR'
]

export function getLocalizedStrings(culture: string): Record<string, string> {
    const lang: Record<string, Record<string, string>> = {
      'sv-SE': {
        entity_missing: 'Ingen data hittades',
        [TransportModes.BUS]: 'Buss',
        [TransportModes.METRO]: 'Tunnelbana',
        [TransportModes.LIGHT_RAILWAY]: 'Lokalbana',
        [TransportModes.TRAIN]: 'Pendeltåg',
        [TransportModes.TRAM]: 'Spårvagn',
        [TransportModes.FERRY]: 'Båt'
      },
      'en-EN': {
        entity_missing: 'Entity data missing',
        [TransportModes.BUS]: 'Bus',
        [TransportModes.METRO]: 'Subway',
        [TransportModes.LIGHT_RAILWAY]: 'Light Railway',
        [TransportModes.TRAIN]: 'Commuter Train',
        [TransportModes.TRAM]: 'Tram',
        [TransportModes.FERRY]: 'Ferry'
      },
      'fr-FR': {
        entity_missing: 'Aucune info trouv&eacute;e',
        [TransportModes.BUS]: 'Bus',
        [TransportModes.METRO]: 'M&eacute;tro',
        [TransportModes.LIGHT_RAILWAY]: 'Train local',
        [TransportModes.TRAIN]: 'Train r&eacute;gional',
        [TransportModes.TRAM]: 'Trammay',
        [TransportModes.FERRY]: 'Bateau'
      }
    }

    return culture in lang ? lang[culture] : lang['sv-SE'];
}
