import React from 'react'
import Link from 'next/prefetch'

import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import withData from '../src/apollo/withData'

import Frame from '../src/components/Frame'
import ParliamentarianSelect from '../src/components/ParliamentarianSelect'

const articleQuery = gql`
  query article($locale: Locale!) {
    articles(locale: $locale) {
      title,
      url
    }
  }
`

const Index = ({articles, loading, url: {query: {locale}}}) => (
  <Frame locale={locale}>
    <ParliamentarianSelect locale={locale} />
    <h1>Blog</h1>
    {loading && <span>Lädt...</span>}
    {articles.map((article, i) => (
      <div key={i}>
        <h2>
          <Link
            href={`/page?path=${encodeURIComponent(article.url)}&locale=${locale}`}
            as={article.url}>
            {article.title}
          </Link>
        </h2>
      </div>
    ))}
  </Frame>
)

const IndexWithQuery = graphql(articleQuery, {
  options: ({url}) => {
    return {
      variables: {
        locale: url.query.locale
      }
    }
  },
  props: ({data, ownProps: {url}}) => {
    return {
      loading: data.loading,
      articles: data.articles || []
    }
  }
})(Index)

export default withData(IndexWithQuery)
