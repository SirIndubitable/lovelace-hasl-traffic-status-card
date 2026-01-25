import { html, TemplateResult } from "lit";
import { TrafficStatusConfig } from "../config";
import { Deviation } from "../helpers";
import { ViewBase } from "./viewBase";


class LineGroup {
    line: any
    events: string[]

    constructor(line: any) {
        this.line = line;
        this.events = [];
    }
}

export class ByLinesView extends ViewBase {
    render(config: TrafficStatusConfig, trafficEvents: Deviation[], strings: Record<string, string>): TemplateResult {
        var eventsByLine = this.groupDeviationsByLine(config, trafficEvents, strings);

        return html`
            <div class="statuses">
                ${eventsByLine.map(line => this.renderLine(config, line))}
            </div>
        `
    }

    renderLine(config: TrafficStatusConfig, deviation: LineGroup): TemplateResult {
        return html`
            <div class="row status">
                <div class="col icon">
                    <ha-icon class="transport-icon" icon="${this.getTransportModeIcon(deviation.line.transport_mode)}"/>
                </div>
                <div class="col icon">
                    <span class="line-icon mr1 ${this.getLineColor(deviation.line)}">${deviation.line.id}</span>
                </div>
                <div class="col main left">
                </div>
                <div class="col right">
                </div>
            </div>
            <div class="row status-details">
                <div class="col">
                    <ul>
                        ${ deviation.events.map(event => html`<li>${event}</li>`) }
                    </ul>
                </div>
            </div>
        `
    }

    groupDeviationsByLine(config: TrafficStatusConfig, events: Deviation[], strings: Record<string, string>): LineGroup[]  {
        const trafficStatus: Record<number, LineGroup> = {};

        for (const [i, deviation] of Object.entries(events)) {
            if (config.shouldFilterMessage(deviation.message.header)) {
                continue;
            }

            for (const [j, area] of Object.entries(deviation.areas ?? [ null ])) {
                for (const [k, line] of Object.entries(deviation.lines ?? [ null ])) {
                    if (config.shouldFilterLine(line.id)) {
                        continue;
                    }
                    if (config.shouldFilterTrafficType(line.transport_mode, strings)) {
                        continue;
                    }

                    if (!(line.id in trafficStatus)) {
                        trafficStatus[line.id] = new LineGroup(line);
                    }

                    const found = trafficStatus[line.id].events.find(
                        (existingEvent: string) => existingEvent === deviation.message.header);

                    if (typeof found !== 'undefined') {
                        continue
                    }

                    trafficStatus[line.id].events.push(deviation.message.header);
                }
            }
        }

        return Object.values(trafficStatus);
    }
}
