import React from 'react'

import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import withData from '../src/apollo/withData'
// import {H1} from '../src/components/Styled'
// import Message from '../src/components/Message'

import Loader from '../src/components/Loader'
import Frame, {Center} from '../src/components/Frame'
import ListView from '../src/components/ListView'

const searchQuery = gql`
  query search($locale: Locale!, $term: String!) {
    search(locale: $locale, term: $term) {
      __typename
      ... on Parliamentarian {
        id
        name
        firstName
        lastName
        portrait
        councilTitle
        canton
        partyMembership {
          party {
            abbr
          }
        }
      }
      ... on Guest {
        id
        name
        firstName
        lastName
        function
      }
      ... on Organisation {
        id
        name
        legalForm
        location
        group
      }
      ... on LobbyGroup {
        id
        name
        sector
      }
    }
  }
`

const Search = ({loading, error, search, locale}) => (
  <Loader loading={loading} error={error} render={() => (
    <Center>
      <ListView locale={locale} items={search} />
    </Center>
  )} />
)

const SearchWithQuery = graphql(searchQuery, {
  props: ({data}) => {
    return {
      loading: data.loading,
      error: data.error,
      search: data.search
    }
  }
})(Search)

const Page = ({url, url: {query: {locale, term}}}) => (
  <Frame url={url}>
    <SearchWithQuery locale={locale} term={term || ''} />
  </Frame>
)

export default withData(Page)