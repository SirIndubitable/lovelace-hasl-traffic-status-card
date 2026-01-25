
import { Views, SupportedLanguages } from './constants'
import { Deviation } from './helpers';

export const ConfigSchema: Record<string, any> = {
    schema: [
    { name: "name", selector: { text: {} } },
    { name: "entities", required: true, selector: { entity: {multiple: true}  } },
    { name: "language", selector: { text: {} } },
    { name: "show_time", selector: { boolean: {} } },
    { name: "hide_empty", selector: { boolean: {} } },
    { name: "show_type_header", selector: { boolean: {} } },
    { name: "style", selector: { select: { options: Object.values(Views) } } },
    { name: "filters", selector: { object: { label_field: 'label', fields:
        {
            label: { label: "Label", selector: { text: { }} },
            traffic_type: { label: "Traffic Type to Allow (list)", selector: { object: { multiple: true }} },
            lines: { label: "Lines to Allow (list)", selector: { object: { multiple: true }} },
            message: { label: "Message to Ignore (list)", selector: { object: { multiple: true }} }
        }}}},
    ],
    computeLabel: (schema: any) => {
        if (schema.name === "show_time") return "Show Time";
        if (schema.name === "hide_empty") return "Hide Empty Sections";
        if (schema.name === "show_type_header") return "Show Type Header";
        return undefined;
    },
    computeHelper: (schema: any) => {
        switch (schema.name) {
            case "language":
                return `Language code, e.g. ${SupportedLanguages.join(', ')}. Default is sv-SE.`;
            case "filters":
                return `Filters to exclude certain events. Types of filters: 'traffic_type', 'message'.`;
        }
        return undefined;
    },
    assertConfig: (config: any) => {
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

export class DeviationFilter {
    label: string;
    traffic_type: string[];
    message: string[];
    lines: string[];

    constructor(filter: Record<string, any>) {
        this.label = filter.label || '';
        this.traffic_type = filter.traffic_type || [];
        this.message = filter.message || [];
        this.lines = filter.lines || [];
    }
}

export class TrafficStatusConfig {
    name: string;
    entities: string[];
    language: string;
    show_time: boolean;
    hide_empty: boolean;
    show_type_header: boolean;
    style: string;
    filters: DeviationFilter;

    constructor(config: Record<string, any>) {
        if (!config.entities) {
            throw new Error('You need to define one or more entities');
        }

        this.name = config.name || '';
        this.entities = config.entities;
        this.language = config.language || 'sv-SE';
        this.show_time = config.show_time || false;
        this.hide_empty = config.hide_empty || false;
        this.show_type_header = config.show_type_header || false;
        this.style = config.style || Views.LEGACY;
        this.filters = new DeviationFilter(config.filters || {});
    }

    shouldFilter(event: Deviation, strings: Record<string, string>) {
        if (this.shouldFilterMessage(event.message.header)) {
                return true
        }

        for (const [j, line] of Object.entries(event.lines)) {
            if (this.shouldFilterLine(line.id)) {
                 return true
            }
        }


        for (const [j, line] of Object.entries(event.lines)) {
            if (this.shouldFilterTrafficType(line.transport_mode, strings)) {
                 return true
            }
        }

        return false;
    }

    shouldFilterMessage(message: string): boolean {
        for (const [i, filter] of Object.entries(this.filters.message)) {
            if (message.match(filter)) {
                return true;
            }
        }

        return false;
    }

    shouldFilterLine(lineId: number): boolean {
        if (this.filters.lines.length == 0) {
            return false
        }

        return lineId.toString() !in this.filters.lines
    }

    shouldFilterTrafficType(transport_mode: string, strings: Record<string, string>): boolean {
        if (this.filters.traffic_type.length == 0) {
            return false
        }

        return strings[transport_mode].toLowerCase() !in this.filters.traffic_type
    }
}
