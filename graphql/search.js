const {descending} = require('d3-array')
const api = require('./api')
const mappers = require('./mappers')

const cleanKeywords = keywords => keywords
  .filter(Boolean)
  .map(keyword => keyword.toLowerCase())

module.exports.loadSearch = (locales) => {
  return Promise.all(locales.map(locale => {
    return Promise.all([
      api.data(locale, 'data/interface/v1/json/table/parlamentarier/flat/list', {
        select_fields: [
          'parlament_number', 'vorname', 'zweiter_vorname', 'nachname',
          'beruf', 'geschlecht', 'geburtstag',
          'parteifunktion', 'partei_name', 'partei',
          'kanton_name_de', 'kanton_name_fr', 'rat',
          'im_rat_bis_unix', 'im_rat_seit_unix'
        ].join(',')
      }),
      api.data(locale, 'data/interface/v1/json/table/zutrittsberechtigung/flat/list', {
        select_fields: 'person_id,vorname,nachname,beruf,geschlecht,funktion,zweiter_vorname'
      }),
      api.data(locale, 'data/interface/v1/json/table/interessengruppe/flat/list'),
      api.data(locale, 'data/interface/v1/json/table/organisation/flat/list', {
        select_fields: 'name_de,name_fr,rechtsform,ort,interessengruppe,uid'
      })
    ]).then(([
      {json: {data: parliamentarians}},
      {json: {data: guests}},
      {json: {data: lobbyGroups}},
      {json: {data: organisations}}
    ]) => {
      const index = parliamentarians.map(parliamentarian => ({
        type: 'Parliamentarian',
        raw: parliamentarian,
        keywords: cleanKeywords([
          parliamentarian.nachname,
          parliamentarian.vorname,
          parliamentarian.zweiter_vorname,
          parliamentarian.kanton_name,
          parliamentarian.partei
        ])
      })).concat(guests.map(guest => ({
        type: 'Guest',
        raw: guest,
        keywords: cleanKeywords([
          guest.nachname,
          guest.vorname,
          guest.zweiter_vorname,
          guest.funktion
        ])
      }))).concat(lobbyGroups.map(lobbyGroup => ({
        type: 'LobbyGroup',
        raw: lobbyGroup,
        keywords: cleanKeywords([
          lobbyGroup.name,
          lobbyGroup.alias_namen,
          lobbyGroup.branche
        ])
      }))).concat(organisations.map(organisation => ({
        type: 'Organisation',
        raw: organisation,
        keywords: cleanKeywords([
          organisation.name,
          organisation.uid,
          organisation.interessengruppe
        ])
      })))

      return (term, t) => {
        const terms = term.split(/\s+/).map(term => term.toLowerCase())
        return index.map(item => {
          const match = item.keywords.reduce(
            (sum, keyword) => {
              terms.forEach(term => {
                if (keyword.indexOf(term) !== -1) {
                  sum += term === keyword ? 10 : 1
                }
              })
              return sum
            },
            0
          )
          if (match) {
            return [match, item]
          }
        }).filter(Boolean)
        .sort((a, b) => descending(a[0], b[0]))
        .slice(0, 10)
        .map(d => {
          return mappers[`map${d[1].type}`](d[1].raw, t)
        })
      }
    })
  }))
}