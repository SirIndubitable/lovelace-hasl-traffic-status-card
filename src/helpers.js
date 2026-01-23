export const html_style = `<style>
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

export function getLineColor(line) {
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
