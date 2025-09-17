# SL Traffic Status Lovelace Card
Present traffic status from HASL Combination sensors.

![card](https://user-images.githubusercontent.com/1217994/57677754-e1773980-7627-11e9-81e7-4b991a6e4dc1.png)

## Manual Installation
Copy [`hasl-traffic-status-card.js`](https://github.com/hasl-platform/lovelace-hasl-traffic-status-card/blob/master/dist/hasl-traffic-status-card.js) to `<config>/www/hasl-traffic-status-card.js`

Where `<config>` is your Home Assistant configuration directory.
Then use the following in your ui-lovelace.yaml file:

```yaml
resources:
  - url: /local/hasl-traffic-status-card.js
    type: js
```

and use the card through this example:

```yaml
cards:
  - type: custom:hasl-traffic-status-card
    name: Traffic Status
    language: sv-SE
    show_time: false
    hide_empty: true
    entities:
      - sensor.traffic_status
    filters:
      traffic_type:
        - Buss
      message:
        - Indragen hållplats
        - Avstängd hiss
        - Felaktiga utrop förekommer
        - Hållplats .* flyttad
```

## Configuration variables

- **name** (*Optional*): If specified it will not render titles per entity in the card, but rather have this as the card name. If not specified it will render each sensors name

- **language** (*Optional*): The texts will be rendered in this language. Can be one of `sv-SE`, `en-EN` or `fr-FR`

- **show_time** (*Optional*): Render the time beside the name of the card, default `false`

- **hide_empty** (*Optional*): Hide traffic types with empty events, default `false`

- **filters** (*Optional*): List of text filters for traffic_type (in configured language) and messages
