import React from 'react'

import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import withData, {serverContext} from '~/apollo/withData'

import Frame from '~/components/Frame'

const parliamentarianQuery = gql`
  query getParliamentarian($locale: Locale!, $id: Int!) {
    getParliamentarian(locale: $locale, id: $id) {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      partyMembership {
        function,
        party {
          name
        }
      }
    }
  }
`

const Parliamentarian = ({loading, firstName, dateOfBirth, gender, lastName, partyMembership, content, url: {query: {locale}}}) => (
  <Frame locale={locale}>
    <h1>{firstName} {lastName}</h1>
    {loading && <span>Lädt...</span>}
    <dl>
      <dt>Person</dt>
      <dd>{dateOfBirth} {gender}</dd>
      {partyMembership && <dt>{partyMembership.party.name}</dt>}
      {partyMembership && <dd>{partyMembership.function}</dd>}
    </dl>
  </Frame>
)

const ParliamentarianWithQuery = graphql(parliamentarianQuery, {
  options: ({url}) => {
    return {
      variables: {
        id: url.query.id,
        locale: url.query.locale
      }
    }
  },
  props: ({data}) => {
    if (serverContext) {
      if (data.getParliamentarian && data.getParliamentarian.statusCode) {
        serverContext.res.statusCode = data.getParliamentarian.statusCode
      }
    }
    return {
      loading: data.loading,
      ...data.getParliamentarian
    }
  }
})(Parliamentarian)

export default withData(ParliamentarianWithQuery)
