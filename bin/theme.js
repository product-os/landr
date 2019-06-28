/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const _ = require('lodash')
const Vibrant = require('node-vibrant')
const DEFAULT_THEME = require('../default-theme.json')

module.exports = async (imageBase64) => {
  if (!imageBase64) {
    return DEFAULT_THEME
  }

  const vibrant = Vibrant.from(Buffer.from(
    _.last(imageBase64.split(',')), 'base64'))
  const palette = await vibrant.getPalette()

  return {
    vibrant: {
      dark: {
        title: palette.DarkVibrant.getTitleTextColor(),
        text: palette.DarkVibrant.getBodyTextColor(),
        color: palette.DarkVibrant.getHex()
      },
      light: {
        title: palette.LightVibrant.getTitleTextColor(),
        text: palette.LightVibrant.getBodyTextColor(),
        color: palette.LightVibrant.getHex()
      },
      normal: {
        title: palette.Vibrant.getTitleTextColor(),
        text: palette.Vibrant.getBodyTextColor(),
        color: palette.Vibrant.getHex()
      }
    },
    muted: {
      dark: {
        title: palette.DarkMuted.getTitleTextColor(),
        text: palette.DarkMuted.getBodyTextColor(),
        color: palette.DarkMuted.getHex()
      },
      light: {
        title: palette.LightMuted.getTitleTextColor(),
        text: palette.LightMuted.getBodyTextColor(),
        color: palette.LightMuted.getHex()
      },
      normal: {
        title: palette.Muted.getTitleTextColor(),
        text: palette.Muted.getBodyTextColor(),
        color: palette.Muted.getHex()
      }
    }
  }
}
