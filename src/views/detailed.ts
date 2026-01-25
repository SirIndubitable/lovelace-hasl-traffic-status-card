import { html, nothing, TemplateResult } from "lit";
import { TrafficStatusConfig } from "../config";
import { TransportModes } from "../constants";
import { Deviation } from "../helpers";
import { ViewBase } from "./viewBase";

export class DetailedView extends ViewBase {
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
            ${ this.renderDeviationAreas(deviation)}
            <div class="row">
                <div class="col icon">
                </div>
                <div class="col main left">
                    ${deviation.message.header}
                </div>
            </div>
            <div class="row">
                <div class="col icon">
                </div>
                <div class="col main left">
                    ${deviation.message.details}
                </div>
            </div>
        `
    }

    renderDeviationAreas(deviation: Deviation): TemplateResult {
        if (deviation.areas.length == 0) {
            return html``;
        }

        return html`
            <div class="row status">
                <div class="col icon">
                </div>
                <div class="col area">
                    ${ deviation.areas.map(area => area.name).join(', ') }
                </div>
                <div class="col main left">
                </div>
                <div class="col right">
                </div>
            </div>
        `
    }

    groupDeviationsByMode(config: TrafficStatusConfig, events: Deviation[], strings: Record<string, string>): Record<string, Deviation[]>  {
        const trafficStatus: Record<string, Array<Deviation>> = {
            [TransportModes.BUS]: [],
            [TransportModes.TRAIN]: [],
            [TransportModes.METRO]: [],
            [TransportModes.TRAM]: [],
            [TransportModes.FERRY]: [],
        }

        for (const [i, event] of Object.entries(events)) {
            if (config.shouldFilter(event, strings)) {
                continue;
            }

            trafficStatus[event.lines[0].transport_mode].push(event)
        }

        for (const trafficType in trafficStatus) {
            trafficStatus[trafficType].sort(
                (a, b) => -(a.importance_level - b.importance_level))
        }

        return trafficStatus;
    }
}
