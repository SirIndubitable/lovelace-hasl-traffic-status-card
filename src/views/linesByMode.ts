import { html, nothing, TemplateResult } from "lit";
import { TrafficStatusConfig } from "../config";
import { TransportModes } from "../constants";
import { Deviation, Line } from "../helpers";
import { ViewBase } from "./viewBase";


export class LinesByModeView extends ViewBase {
    render(config: TrafficStatusConfig, trafficEvents: Deviation[], strings: Record<string, string>): TemplateResult {
        var eventsByMode = this.groupDeviationsByMode(config, trafficEvents, strings);

        return html`
            ${Object.keys(eventsByMode).map(mode => this.renderMode(config, mode, eventsByMode[mode], strings))}
        `
    }

    renderMode(config: TrafficStatusConfig, trafficType: string, events: Array<Deviation>, strings: Record<string, string>): TemplateResult {
        if (events.length == 0 && config.hide_empty) {
            return html``;
        }

        return html`
            <div class="statuses">
                ${this.renderTrafficTypeHeader(config, trafficType, strings)}
                ${ events.map(event => this.renderDiviation(event)) }
            </div>
        `
    }

    renderDiviation(deviation: Deviation): TemplateResult {
        return html`
            <div class="row status">
                <div class="col icon">
                </div>
                <div class="col icon">
                    ${deviation.lines.map(line => html`<span class="line-icon mr1 ${this.getLineColor(line)}">${line.id}</span>`)}
                </div>
                <div class="col main left">
                </div>
                <div class="col right">
                </div>
            </div>
            <div class="row">
                <div class="col icon">
                </div>
                <div class="col main left">
                    ${deviation.message.header}
                </div>
                <div class="col right">
                </div>
            </div>
        `
    }

    groupDeviationsByMode(config: TrafficStatusConfig, events: Deviation[], strings: Record<string, string>): Record<string, Deviation[]>  {
        const trafficStatus: Record<string, Deviation[]> = {
            [TransportModes.BUS]: [],
            [TransportModes.TRAIN]: [],
            [TransportModes.METRO]: [],
            [TransportModes.TRAM]: [],
            [TransportModes.FERRY]: [],
        }

        for (const [i, deviation] of Object.entries(events)) {
            if (config.shouldFilter(deviation, strings)) {
                continue;
            }

            for (const [j, area] of Object.entries(deviation.areas ?? [ null ])) {
                for (const [k, line] of Object.entries(deviation.lines ?? [ null ])) {
                     const found = trafficStatus[line.transport_mode].find(
                        existingEvent => existingEvent.message.header === deviation.message.header);
                    if (typeof found === 'undefined') {
                        trafficStatus[line.transport_mode].push(new Deviation({
                            "deviation_case_id": deviation.id,
                            "message_variants": [
                                deviation.message
                            ],
                            "priority": {
                                "importance_level": deviation.importance_level
                            },
                            "scope": {
                                "stop_areas": area ? [ area ] : [],
                                "lines": [ line ]
                            },
                        }));
                        continue
                    }

                    if (!found.lines.some((l: Line) => l.id === line.id))
                    {
                        found.lines.push(line);
                    }

                    found.importance_level = Math.max(found.importance_level, deviation.importance_level);
                }
            }
        }

        for (const trafficType in trafficStatus) {
            trafficStatus[trafficType] = trafficStatus[trafficType].filter(event => !config.shouldFilter(event, strings));

            trafficStatus[trafficType].sort(
                (a, b) => -(a.importance_level - b.importance_level))
        }

        return trafficStatus;
    }
}
