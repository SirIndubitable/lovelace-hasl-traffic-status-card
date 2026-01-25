import {css} from 'lit'

const lineColorsStyles = css`
    .line-icon {
        border-radius: 3px;
        padding: 3px 3px 0 3px;
        color: #fff;
        min-width: 22px;
        height: 22px;
        font-weight: 500;
        display: inline-block;
        text-align: center;
        text-shadow: 1px 1px 2px var(--outline-color);
    }

    /* Buses */
    .line-icon.bus_blue {
        background-color: rgba(38, 122, 190, 1);
    }

    .line-icon.bus_red {
        background-color: rgba(200, 24, 30, 1);
    }

    /* Metro */
    .line-icon.met_blue {
        background-color: rgba(7, 164, 238, 1);
    }

    .line-icon.met_green {
        background-color: rgba(33, 178, 89, 1);
    }

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
    `

const trafficEntityStyles = css`
    ul {
        margin: 0;
    }

    .card-header .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--ha-font-size-2xl);
    }

    .statuses > :first-child {
        margin-top: 0;
    }

    .row {
        margin-top: 8px;

        display: flex;
        justify-content: space-between;
    }

    .col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
    }

    .col.icon {
        flex-basis: 40px;
    }

    .col.area {
        font-weight: var(--ha-font-weight-bold);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .row.name {
        height: 40px;
        padding-left: 8px;
        font-weight: var(--ha-font-weight-normal);
        font-size: var(--ha-font-size-m);
        align-items: center;
        justify-content: center;
    }

    .row.header {
        height: 40px;
        font-size: var(--ha-font-size-xl);
        font-weight: var(--ha-font-weight-bold);
        font-family: var(--ha-font-family-body);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--ha-line-height-normal);
        text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
        opacity: var(--dark-primary-opacity);
    }

    .row.status-details {
        margin-top: 0px;
    }

    .main {
        flex: 2;
    }

    .transport-icon {
        width: 40px;
        height: 40px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    .mr1 {
        margin-right: 8px;
    }

    .updated {
        padding-left: 16px;
        padding-top: 8px;
        font-size: var(--ha-font-size-s);
    }

    .center { text-align: center; }
    .left { text-align: left; }
    .right { text-align: right; }

    ha-icon {
        transition: color 0.3s ease-in-out, filter 0.3s ease-in-out;
        width: 24px;
        height: 24px;
        color: var(--paper-item-icon-color);
    }
`

export default [trafficEntityStyles, lineColorsStyles]
