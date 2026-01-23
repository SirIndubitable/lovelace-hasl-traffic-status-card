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

class HASLTrafficStatusCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      this.content = document.createElement('div');
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const config = this.config;

    function getEntitiesContent(data) {
      var html = `<style>
          ha-card {
            padding: 16px;
          }

          .header {
            font-family: var(--paper-font-headline_-_font-family);
            -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
            font-size: var(--paper-font-headline_-_font-size);
            font-weight: var(--paper-font-headline_-_font-weight);
            letter-spacing: var(--paper-font-headline_-_letter-spacing);
            line-height: var(--paper-font-headline_-_line-height);
            text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            opacity: var(--dark-primary-opacity);
            padding: 4px 0px 12px;
            display: flex;
            justify-content: space-between;
          }

          ha-icon {
            transition: color 0.3s ease-in-out, filter 0.3s ease-in-out;
            width: 24px;
            height: 24px;
            color: var(--paper-item-icon-color);
          }

          ha-icon.good {
            color: green;
          }

          ha-icon.planned {
            color: grey;
          }

          ha-icon.minor {
            color: orange;
          }

          ha-icon.major {
            color: red;
          }

          * {
            box-sizing: border-box;
          }

          table.sl-traffic-status-table {
              width: 100%;
              border-spacing: 0px 8px;
          }

          th.col1, td.col1 {
              text-align: center;
              width: 24px;
              height: 30px;
          }

          th.col2, td.col2 {
              padding-left:10px;
              text-align: left;
              line-height: 18px;
          }

          th.col2{
            font-size: 18px;
            font-weight: 400;
          }

          th.col3, td.col3 {
              text-align: right;
              line-height: 18px;
          }

          .line-icon {
            width: auto;
            border-radius: 2px;
            background: #0089ca;
            padding: 3px 3px 0 3px;
            margin: 0 3px 3px 3px;
            color: #fff;
            min-width: 22px;
            height: 22px;
            font-weight: 500;
            display: inline-block;
            text-align: center;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          }

          /* Metros */
          .line-icon.bus_blue {
              background-color: rgba(38, 122, 190, 1);
          }

          /* Buses and Metro Red Line */
          .line-icon.bus_red {
              background-color: rgba(200, 24, 30, 1);
          }

          .line-icon.met_blue {
              background-color: rgba(7, 164, 238, 1);
          }

          .line-icon.met_green {
              background-color: rgba(33, 178, 89, 1);
          }

          /* Buses and Metro Red Line */
          .line-icon.met_red {
              background-color: rgba(228, 31, 38, 1);
          }

          /* Commuter Trains */
          .line-icon.trn {
              background-color: rgba(241, 102, 167, 1);
          }

          /* Trams */
          .line-icon.trm_7 {
              background-color: rgba(128, 133, 126, 1);
          }

          .line-icon.trm_12 {
              background-color: rgba(115, 139, 164, 1);
          }

          .line-icon.trm_21 {
              background-color: rgba(181, 102, 49, 1);
          }

          .line-icon.trm_25 {
              background-color: rgba(32, 178, 170, 1);
          }

          .line-icon.trm_27 {
              background-color: rgba(160, 94, 166, 1);
          }

          .line-icon.trm_30 {
              background-color: rgba(224, 130, 32, 1);
          }

          .line-icon.ferry {
              background-color: rgba(6, 145, 211, 1);
          }

        </style>
        `;

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
          html += `<span class="line-icon${getLineColor(line)}"><b>${line.id}</b></span>`
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

    function getLineColor(line) {
      switch (line.id) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 6:
          // Blåbusslinje
          return " bus_blue";

        case 7:
          // Spårväg City
          return " trm_7";

        case 10:
        case 11:
          // Blå linjen
          return " met_blue";

        case 12:
          // Nockebybanan
          return " trm_12";

        case 13:
        case 14:
          // Röda linjen
          return " met_red";

        case 17:
        case 18:
        case 19:
          // Gröna linjen
          return " met_green";

        case 21:
          // Lidingöbanan
          return " trm_21";

        case 25:
        case 26:
          // Saltsjöbanan
          return " trm_25";

        case 27:
        case 28:
        case 29:
          // Roslagsbanan
          return " trm_27";

        case 30:
        case 31:
          // Tvärbanan
          return " trm_30";

        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 48:
          // Pendeltåg
          return " trn";
      }

      if (line.transport_mode == 'BUS') {
        // All blue buses that aren't sin have 3 digit line numbers with the middle digit being a 7
        if (line.id.length == 3 && (line.id / 10) % 10 == 7 ) {
          // Blåbusslinje
          return " bus_blue";
        }

        return " bus_red";
      }

      if (line.transport_mode == 'FERRY') {
        return " ferry";
      }

      return "";
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

customElements.define('hasl-traffic-status-card', HASLTrafficStatusCard);
