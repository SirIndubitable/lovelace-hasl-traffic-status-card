import { html, TemplateResult } from "lit";
import { TrafficStatusConfig } from "../config";
import { TransportModes } from "../constants";
import { Deviation, Line } from "../helpers";

export abstract class ViewBase {

    abstract render(config: TrafficStatusConfig, trafficEvents: Deviation[], strings: Record<string, string>): TemplateResult;

    renderTrafficTypeHeader(config: TrafficStatusConfig, trafficType: string, strings: Record<string, string>): TemplateResult {
        if (!config.show_type_header) {
            return html``
        }

        return html`
            <div class="row status header">
                <div class="col icon">
                    <ha-icon class="transport-icon" icon="${this.getTransportModeIcon(trafficType)}"/>
                </div>
                <div class="col main left">
                    ${strings[trafficType]}
                </div>
                <div class="col right">
                </div>
            </div>`
    }

    getTransportModeIcon(trafficMode: string): string {
        const icons: Record<string, string> = {
            [TransportModes.METRO]: 'mdi:subway',
            [TransportModes.BUS]: 'mdi:bus',
            [TransportModes.TRAM]: 'mdi:tram',
            [TransportModes.TRAIN]: 'mdi:train',
            [TransportModes.FERRY]: 'mdi:ferry',
            [TransportModes.LIGHT_RAILWAY]: 'mdi:train-light-rail',
        };

        return icons[trafficMode] || ''
    }


    getLineColor(line: Line) {
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
            // All blue buses that aren't single digit have 3 digit line numbers with the middle digit being a 7
            if (line.id > 100 && Math.floor(line.id / 10) % 10 == 7 ) {
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
