/* global customElements */
import { HASLTrafficStatusCard } from './card'

customElements.define('hasl-traffic-status-card', HASLTrafficStatusCard)

window.customCards = window.customCards || []
window.customCards.push({
  type: 'hasl-traffic-status-card',
  name: 'HASL Traffic Status Card',
  preview: false,
  description: 'A card that shows traffic status for HASL, including buses, trams, metros, and ferries.',
  documentationURL:
    'https://github.com/SirIndubitable/lovelace-hasl-traffic-status-card'
})
