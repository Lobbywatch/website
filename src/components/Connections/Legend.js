import PropTypes from 'prop-types'
import React from 'react'
import {css, merge} from 'glamor'

import {LW_BLUE, GREY_DARK, mediaM} from '../../theme'
import {intersperse} from '../../utils/helpers'
import {Link as RawRouteLink} from '../../../routes'
import {Clear} from '../Styled'

const legendContainer = css({
  paddingTop: 20,
  paddingBottom: 20,
  position: 'absolute',
  top: 0,
  left: 20,
  right: 20,
  fontSize: 12,
  textAlign: 'left',
  [mediaM]: {
    fontSize: 14,
    textAlign: 'right'
  }
})

const legendLabel = css({
  color: GREY_DARK,
  [mediaM]: {
    marginRight: 10
  }
})
const legendLink = merge(legendLabel, {
  textDecoration: 'none',
  color: LW_BLUE
})
const legendValues = css({
  float: 'right'
})
const legendValue = css({
  whiteSpace: 'nowrap'
})

const legendBubble = css({
  display: 'inline-block',
  marginRight: 5,
  marginLeft: 5,
  width: 8,
  height: 8,
  borderRadius: '50%'
})

const Legend = ({locale, title, pagePath, items}) => (
  <Clear {...legendContainer}>
    {!!pagePath && <RawRouteLink
      route='page'
      params={{
        locale,
        path: pagePath
      }}>
      <a {...legendLink}>{title}</a>
    </RawRouteLink>}
    {!pagePath && <span {...legendLabel}>{title}</span>}

    <span {...legendValues}>
      {intersperse(items.map(({label, color, textColor, border}, i) => (
        <span key={i} {...legendValue} style={{color: textColor || color}}>
          <span {...legendBubble} style={{backgroundColor: color, border}} />{label}
        </span>
      )), ' ')}
    </span>
  </Clear>
)

Legend.propTypes = {
  title: PropTypes.string.isRequired,
  pagePath: PropTypes.array,
  locale: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }))
}

export default Legend
