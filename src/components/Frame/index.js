import React, {PropTypes} from 'react'
import Head from 'next/head'
import {css} from 'glamor'

import Header from './Header'
import Footer from './Footer'
import {BLACK, FRAME_PADDING} from '../../theme'

const centerStyle = css({
  maxWidth: 800,
  padding: FRAME_PADDING,
  margin: '0 auto'
})
export const Center = ({children, ...props}) => <div {...props} {...centerStyle}>{children}</div>

css.global('html', {boxSizing: 'border-box'})
css.global('*, *:before, *:after', {boxSizing: 'inherit'})
css.global('body, h1, h2, h3, h4, h5, h6, input, textarea', {fontFamily: "'Roboto', sans-serif"})
css.global('body', {color: BLACK})

const containerStyle = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
})

const bodyGrowerStyle = css({
  flexGrow: 1
})

const fontFaces = `@font-face{font-family:Roboto;font-style:normal;font-weight:300;src:local('Roboto Light'),local('Roboto-Light'),url(/static/fonts/roboto-v16-latin-300.woff2) format('woff2'),url(/static/fonts/roboto-v16-latin-300.woff) format('woff')}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(/static/fonts/roboto-v16-latin-regular.woff2) format('woff2'),url(/static/fonts/roboto-v16-latin-regular.woff) format('woff')}@font-face{font-family:Roboto;font-style:normal;font-weight:500;src:local('Roboto Medium'),local('Roboto-Medium'),url(/static/fonts/roboto-v16-latin-500.woff2) format('woff2'),url(/static/fonts/roboto-v16-latin-500.woff) format('woff')}@font-face{font-family:Roboto;font-style:normal;font-weight:700;src:local('Roboto Bold'),local('Roboto-Bold'),url(/static/fonts/roboto-v16-latin-700.woff2) format('woff2'),url(/static/fonts/roboto-v16-latin-700.woff) format('woff')}`

const Frame = ({url, url: {query: {locale, term}}, localizeRoute, children}) => (
  <div {...containerStyle}>
    <div {...bodyGrowerStyle}>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' rel='stylesheet' />
      </Head>
      <Header locale={locale} term={term} url={url} localizeRoute={localizeRoute} />
      {children}
    </div>
    <Footer locale={locale} />
  </div>
)

Frame.propTypes = {
  children: PropTypes.node,
  localizeRoute: PropTypes.func,
  url: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired
}

export default Frame
