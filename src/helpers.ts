import { TransportModes } from './constants';

// export const html_style = `<style>
//     ha-card {
//         padding: 16px;
//     }

//     .header {
//         font-family: var--ha-font-family-body);
//         -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
//         font-size: var(--ha-font-size-m);
//         font-weight: var(--ha-font-weight-normal);
//         letter-spacing: var(--paper-font-headline_-_letter-spacing);
//         line-height: var(--ha-line-height-normal);
//         text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
//         opacity: var(--dark-primary-opacity);
//         padding: 4px 0px 12px;
//         display: flex;
//         justify-content: space-between;
//     }

//     ha-icon {
//         transition: color 0.3s ease-in-out, filter 0.3s ease-in-out;
//         width: var(--ha-space-6);
//         height: var(--ha-space-6);
//         color: var(--paper-item-icon-color);
//     }

//     ha-icon.good {
//         color: green;
//     }

//     ha-icon.planned {
//         color: grey;
//     }

//     ha-icon.minor {
//         color: orange;
//     }

//     ha-icon.major {
//         color: red;
//     }

//     * {
//         box-sizing: border-box;
//     }

//     table.sl-traffic-status-table {
//         width: 100%;
//         border-spacing: 0px 8px;
//     }

//     th.col1, td.col1 {
//         text-align: center;
//         width: var(--ha-space-6);
//         height: var(--ha-space-8);
//         font-weight: var(--ha-font-weight-body);
//     }

//     th.col2, td.col2 {
//         padding-left:10px;
//         text-align: left;
//         line-height: var(--ha-line-height-normal);
//         font-weight: var(--ha-font-weight-body);
//     }

//     th.col3, td.col3 {
//         text-align: right;
//         line-height: var(--ha-line-height-normal);
//         font-weight: var(--ha-font-weight-body);
//     }

//     .line-icon {
//         width: auto;
//         border-radius: var(--ha-border-radius-sm);
//         background: #0089ca;
//         padding: 3px 3px 0 3px !important;
//         margin: 0 3px 3px 3px;
//         color: #fff;
//         min-width: 26px;
//         height: 22px;
//         font-size: var(--ha-font-size-m);
//         font-weight: var(--ha-font-weight-heading);
//         display: inline-block;
//         text-align: center;
//         text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
//     }

//     .heading {
//         margin-left: 4px;
//         font-size: var(--ha-font-size-l);
//         font-weight: var(--ha-font-weight-heading);
//     }

//     .details {
//         margin-left: 4px;
//         font-size: var(--ha-font-size-m);
//         font-weight: var(--ha-font-weight-body);
//     }




//     /* Metros */
//     .line-icon.bus_blue {
//         background-color: rgba(38, 122, 190, 1);
//     }

//     /* Buses and Metro Red Line */
//     .line-icon.bus_red {
//         background-color: rgba(200, 24, 30, 1);
//     }

//     .line-icon.met_blue {
//         background-color: rgba(7, 164, 238, 1);
//     }

//     .line-icon.met_green {
//         background-color: rgba(33, 178, 89, 1);
//     }

//     /* Buses and Metro Red Line */
//     .line-icon.met_red {
//         background-color: rgba(228, 31, 38, 1);
//     }

//     /* Commuter Trains */
//     .line-icon.trn {
//         background-color: rgba(241, 102, 167, 1);
//     }

//     /* Trams */
//     .line-icon.trm_7 {
//         background-color: rgba(128, 133, 126, 1);
//     }

//     .line-icon.trm_12 {
//         background-color: rgba(115, 139, 164, 1);
//     }

//     .line-icon.trm_21 {
//         background-color: rgba(181, 102, 49, 1);
//     }

//     .line-icon.trm_25 {
//         background-color: rgba(32, 178, 170, 1);
//     }

//     .line-icon.trm_27 {
//         background-color: rgba(160, 94, 166, 1);
//     }

//     .line-icon.trm_30 {
//         background-color: rgba(224, 130, 32, 1);
//     }

//     .line-icon.ferry {
//         background-color: rgba(6, 145, 211, 1);
//     }

// </style>
// `;


export class Stop {
    id: number;
    name: string;

    constructor(data: Record<string, any>) {
        this.id = data.id;
        this.name = data.name;
    }
}

export class Line {
    id: number;
    transport_mode: string;
    group_of_lines: string;

    constructor(data: Record<string, any>) {
        this.id = data.id;
        this.transport_mode = data.transport_mode;
        this.group_of_lines = data.group_of_lines;
    }
}

export class Message {
    header: string;
    details: string;
    scope_alias: string;

    constructor(data: Record<string, any>) {
        this.header = data.header;
        this.details = data.details;
        this.scope_alias = data.scope_alias;
    }
}

export class Deviation {
//   version: 1
//   created: '2026-01-22T07:36:49.847000+01:00'
//   publish:
//     from_: '2026-01-22T07:36:49.840000+01:00'
//     upto: '2026-02-22T23:30:00+01:00'
//   priority:
//     importance_level: 2
//     influence_level: 3
//     urgency_level: 1
//   message_variants:
//     - header: Avstängd hiss vid Årstaberg
//       details: >-
//         Årstaberg: Hissen mellan plattformen och biljetthallen är avstängd sedan
//         2026-01-22 på grund av tekniskt fel.
//         ...
//       scope_alias: Pendeltåg 40, 41
//       language: sv
//       weblink: null
//   modified: null
//   deviation_case_id: 9963731
//   scope:
//     stop_areas:
//       - id: 5135
//         transport_authority: 1
//         name: Årstaberg
//         type: RAILWSTN
//         stop_points: null
//     lines:
//       - id: 40
//         transport_authority: 1
//         transport_mode: TRAIN
//         designation: '40'
//         name: null
//         group_of_lines: Pendeltåg
//       - id: 41
//         transport_authority: 1
//         transport_mode: TRAIN
//         designation: '41'
//         name: null
//         group_of_lines: Pendeltåg

    importance_level: number;
    message: Message;
    id: number;
    areas: Array<Stop>;
    lines: Array<Line>;

    constructor(data: Record<string, any>) {
        this.id = data.deviation_case_id;
        this.importance_level = data.priority.importance_level;
        this.message = new Message(data.message_variants[0]);
        this.areas = (data.scope.stop_areas || []).map((areaData: Record<string, any>) => new Stop(areaData));
        this.lines = (data.scope.lines || []).map((lineData: Record<string, any>) => new Line(lineData));
    }
}
