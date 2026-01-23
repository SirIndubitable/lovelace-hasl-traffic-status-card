import * as helpers from '../src/helpers.js'

test('getLineColor', () => {
    expect(helpers.getLineColor({id: 1 })).toBe(' bus_blue')
    expect(helpers.getLineColor({id: 7 })).toBe(' trm_7')
    expect(helpers.getLineColor({id: 11 })).toBe(' met_blue')
    expect(helpers.getLineColor({id: 12 })).toBe(' trm_12')
    expect(helpers.getLineColor({id: 14 })).toBe(' met_red')
    expect(helpers.getLineColor({id: 19 })).toBe(' met_green')
    expect(helpers.getLineColor({id: 21 })).toBe(' trm_21')
    expect(helpers.getLineColor({id: 25 })).toBe(' trm_25')
    expect(helpers.getLineColor({id: 29 })).toBe(' trm_27')
    expect(helpers.getLineColor({id: 30 })).toBe(' trm_30')
    expect(helpers.getLineColor({id: 48 })).toBe(' trn')

    expect(helpers.getLineColor({id: 179, transport_mode: 'BUS'})).toBe(' bus_blue')
    expect(helpers.getLineColor({id: 555, transport_mode: 'BUS'})).toBe(' bus_red')

    expect(helpers.getLineColor({id: 1234, transport_mode: 'FERRY'})).toBe(' ferry')

    expect(helpers.getLineColor({id: 9999, transport_mode: 'SPACE SHIP'})).toBe('')
})
