import * as helpers from './helpers.js'

const lang = {
  'sv-SE': {
    entity_missing: 'Ingen data hittades',
    BUS: 'Buss',
    METRO: 'Tunnelbana',
    light_railway: 'Lokalbana',
    TRAIN: 'Pendeltåg',
    TRAM: 'Spårvagn',
    FERRY: 'Båt'
  },
  'en-EN': {
    entity_missing: 'Entity data missing',
    BUS: 'Bus',
    METRO: 'Subway',
    light_railway: 'Light Railway',
    TRAIN: 'Commuter Train',
    TRAM: 'Tram',
    FERRY: 'Ferry'
  },
  'fr-FR': {
    entity_missing: 'Aucune info trouv&eacute;e',
    BUS: 'Bus',
    METRO: 'M&eacute;tro',
    light_railway: 'Train local',
    TRAIN: 'Train r&eacute;gional',
    TRAM: 'Trammay',
    FERRY: 'Bateau'
  }
}

export class HASLTrafficStatusCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      this.content = document.createElement('div');
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const config = this.config;

    function getEntitiesContent(data) {
      var html = helpers.html_style;

      var showCardName = true;

      if (config.show_cardname === false) {
          showCardName = false;
      }

      var culture = "";
      config.language ? culture = config.language : culture = navigator.language || navigator.userLanguage
      if (!lang.hasOwnProperty(culture)) culture = 'sv-SE'

      for (var i = 0; i < data.length; i++) {
        const entity_data = hass.states[data[i]]
        if (typeof entity_data === 'undefined') {
          var str = lang[culture].entity_missing
          console.log(str)
        }
        else {
          var updatedTime = new Date(entity_data.last_updated);
          var updated = updatedTime.toLocaleTimeString(culture, {
              hour: "numeric",
              minute: "numeric"
          })

          if(showCardName === true) {
            if (config.name) html += "<div class=\"header\"><div class=\"name\">" + config.name + (config.show_time === true ? ' '  + updated : '') + "</div></div>"
          }

          const trafficStatuses = getTrafficStatus(entity_data.attributes.deviations, culture)

          html += getTableRow('BUS', trafficStatuses, culture);
          html += getTableRow('METRO', trafficStatuses, culture);
          html += getTableRow('TRAIN', trafficStatuses, culture);
          html += getTableRow('TRAM', trafficStatuses, culture);
          html += getTableRow('FERRY', trafficStatuses, culture);

        }
      }

      return html;
    }

    this.content.innerHTML = getEntitiesContent(config.entities);

    function getTableRow(trafficType, trafficStatuses, culture) {
      var status = trafficStatuses[trafficType]

      var trafficTypeLang = lang[culture][trafficType];

      if (typeof status === 'undefined') {
        return '';
      }
      if (status.events.length == 0 && config.hide_empty) {
        return '';
      }

      var html = '';
      html += "<table class=\"sl-traffic-status-table\">"
      html += `
          <tr>
              <th class="col1"><ha-icon icon="${status.type_icon}"></ha-icon></th>
              <th class="col2">${trafficTypeLang}</th>
              <th class="col3"></td>
          </tr>
        `

      for (const i in status.events) {
        const event = status.events[i]
        event.scope.lines.sort((a, b) => a.id - b.id)

        html += `<tr>`
        html += `<td class="col1"></td>`
        html += `<td class="col2">`
        for (const j in event.scope.lines) {
          const line = event.scope.lines[j]
          html += `<span class="line-icon${helpers.getLineColor(line)}"><b>${line.id}</b></span>`
        }

        html += `<br/>`
        html += event.message_variants[0].header

        html += `</td></tr>`
      }

      html += "</table>"

      return html;
    }

    function getTrafficStatus(deviations, culture) {
      const trafficStatus = {
        'BUS': {
          type_icon: 'mdi:bus',
          events: [],
        },
        'TRAIN': {
          type_icon: 'mdi:train',
          events: [],
        },
        'METRO': {
          type_icon: 'mdi:subway',
          events: [],
        },
        'TRAM': {
          type_icon: 'mdi:tram',
          events: [],
        },
        'FERRY': {
          type_icon: 'mdi:ferry',
          events: [],
        },
        'SHIP': {
          type_icon: 'mdi:ferry',
          events: [],
        },
        'TAXI': {
          type_icon: 'mdi:taxi',
          events: [],
        },
      }

      for (const i in deviations) {
        const deviation = deviations[i]
        const trafficType = deviation.scope.lines[0].transport_mode
        if (shouldSkipEvent(trafficType, deviation, culture)) {
          continue;
        }

        const found = trafficStatus[trafficType].events.find(
          event => event.message_variants[0].header === deviation.message_variants[0].header);
        if (typeof found !== 'undefined')
        {
          for (const j in deviation.scope.lines)
          {
            const line = deviation.scope.lines[j]
            if (!found.scope.lines.some(l => l.id === line.id))
            {
              found.scope.lines.push(line);
            }

            continue;
          }

          found.priority.importance_level = Math.max(found.priority.importance_level, deviation.priority.importance_level);
          continue;
        }

        trafficStatus[trafficType].events.push(deviation)
      }

      for (const trafficType in trafficStatus) {
        trafficStatus[trafficType].events.sort(
          (a, b) => -(a.priority.importance_level - b.priority.importance_level))
      }

      return trafficStatus;
    }

    function shouldSkipEvent(trafficType, event, culture) {
      if (typeof config.filters === 'undefined') return false;

      if (typeof config.filters.message !== 'undefined') {
        for (const i in config.filters.message) {
          const filter = config.filters.message[i];
          if (event.message_variants[0].header.match(filter)) {
            return true;
          }
        }
      }

      if (typeof config.filters.traffic_type !== 'undefined') {
        for (const i in config.filters.traffic_type) {
          const filter = config.filters.traffic_type[i];
          if (lang[culture][trafficType].toLowerCase() === filter.toLowerCase()) {
            return true;
          }
        }
      }

      return false;
    }
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error('You need to define one or more entities');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns. This kind of works but it is very dynamic
  getCardSize() {
    return this.config.entities.length + 1;
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "name", selector: { text: {} } },
        { name: "entities", required: true, selector: { entity: {multiple: true}  } },
        { name: "language", selector: { text: {} } },
        { name: "show_time", selector: { boolean: {} } },
        { name: "hide_empty", selector: { boolean: {} } },
        { name: "filters", selector: { object: { label_field: 'label', fields:
          {
            label: { label: "Label", selector: { text: { }} },
            traffic_type: { label: "Traffic Type (list)", selector: { object: { multiple: true }} },
            message: { label: "Message (list)", selector: { object: { multiple: true }} }
          }}}},
      ],
      computeLabel: (schema) => {
        if (schema.name === "show_time") return "Show Time";
        if (schema.name === "hide_empty") return "Hide Empty Sections";
        return undefined;
      },
      computeHelper: (schema) => {
        switch (schema.name) {
          case "language":
            return `Language code, e.g. ${Object.keys(lang).join(', ')}. Default is sv-SE.`;
          case "filters":
            return `Filters to exclude certain events. Types of filters: 'traffic_type', 'message'.`;
        }
        return undefined;
      },
      assertConfig: (config) => {
        if (!config.entities) {
          throw new Error("'entities' is expected.");
        }
        if (config.filters) {
          if (typeof config.filters !== 'object') throw new Error("'filters' must be in dictionary format.")

          const filterKeys = Object.keys(config.filters);
          for(const i in filterKeys) {
            const key = filterKeys[i];
            if (!Array.isArray(config.filters[key])) {
              throw new Error(`Unknown filter format for '${key}'. Filters must be a list.`);
            }
          }
        }
      },
    };
  }
}
