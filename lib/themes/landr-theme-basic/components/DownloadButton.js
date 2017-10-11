import React, { PropTypes, Component } from 'react'
import Sniffr from 'sniffr'
import sortBy from 'lodash/sortBy'
import arch from 'arch'
import { DropDownButton } from 'resin-components'
import { withTheme } from 'styled-components'
import Link from 'components/Link'

const Asset = ({ asset, color, ...props }, { tracker }) => {
  return (
    <Link {...props} color={color} to={asset.browser_download_url}>
      {asset.name}
    </Link>
  )
}

class DownloadButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assets: props.assets
    }
  }

  componentDidMount() {
    // TODO run tests with .arch detection and see if it's accurate.
    try {
      if (this.state.assets.length < 1) return
      const client = new Sniffr()

      client.sniff(window.navigator.userAgent)
      client.os.arch = arch()

      const assets = this.state.assets

      // give points for not matching
      const score = (condition, p) => (!condition ? p : 0)

      const sortedAssets = sortBy(assets, l => {
        let assetScore = score(
          l.os.toLowerCase() === client.os.name.toLowerCase(),
          2
        )
        if (assetScore === 0) {
          assetScore = assetScore + (l.arch === client.os.arch, 1)
        }

        return assetScore
      })

      this.setState({
        assets: sortedAssets
      })
    } catch (err) {
      console.error(err)
    }
  }

  render(props) {
    const tracker = this.context.tracker
    const assets = [...this.state.assets].filter(t => {
      return t.type !== 'CLI'
    })
    const primaryAsset = assets.shift()

    return (
      <DropDownButton
        emphasized
        px={3}
        primary
        label={
          <Asset onClick={() => {
              tracker.create('download', primaryAsset)
            }}
            asset={primaryAsset}
            color={'white'}
            />
        }
      >
        {assets.map(asset => {
          return (
            <Asset
              py={2}
              asset={asset}
              onClick={() => {
                tracker.create('download', asset)
              }}
              color={props.theme.colors.gray.dark} />
          )
        })}
      </DropDownButton>
    )
  }
}

DownloadButton.contextTypes = {
  tracker: React.PropTypes.object
};

export default withTheme(DownloadButton)
