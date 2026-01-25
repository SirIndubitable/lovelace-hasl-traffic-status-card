import { LitElement, html, nothing, css, TemplateResult } from 'lit'

import type { HomeAssistant, LovelaceCard } from "custom-card-helpers";

import * as helpers from './helpers.js'
import { Views, getLocalizedStrings } from './constants'
import { LinesByModeView } from './views/linesByMode'
import { ConfigSchema, TrafficStatusConfig } from './config';
import { ViewBase } from './views/viewBase';
import { DetailedView } from './views/detailed';
import { ByLinesView } from './views/byLinesView';
import styles from './styles'
import { property, state } from 'lit/decorators';

export class HASLTrafficStatusCard extends LitElement implements LovelaceCard {
  static styles = styles;
  static readonly VIEWS: Record<string, ViewBase> = {
    [Views.BY_LINES]: new ByLinesView(),
    [Views.LEGACY]: new DetailedView(),
    [Views.LINES_BY_MODE]: new LinesByModeView(),
  }

  content: HTMLElement | null = null;

  @state()
  private config?: TrafficStatusConfig

  @property({ attribute: false })
  public hass?: HomeAssistant

  setConfig(config: Record<string, any>) {
    this.config = new TrafficStatusConfig(config);
  }

  render(): TemplateResult {
    if (!this.config || !this.hass) return html``

    // TODO: Support multiple entities?
    const entity_data = this.hass.states[this.config.entities[0]]

    const culture = this.config.language || navigator.language || navigator.userLanguage
    const strings = getLocalizedStrings(culture);

    const deviations = entity_data.attributes.deviations.map(
      (d: Record<string, any>) => new helpers.Deviation(d));

    return html`
      <ha-card>
          ${this.config?.name
              ? html`<div class="card-header"><div class="name">${this.config.name}</div></div>`
              : nothing}
          <div class="card-content">
              ${HASLTrafficStatusCard.VIEWS[this.config.style].render(this.config, deviations, strings)}
          </div>
          ${this.config?.show_time
              ? html`<div class="updated right"><ha-relative-time .hass=${this.hass} .datetime=${entity_data.last_updated}></ha-relative-time></div>`
              : nothing}
      </ha-card>
    `;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns. This kind of works but it is very dynamic
  getCardSize() {
    return (this.config?.entities?.length || 0) + 1;
  }

  static getConfigForm() {
    return ConfigSchema;
  }
}
