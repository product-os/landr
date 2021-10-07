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

import React from 'react'
import {
  Box, Container, Divider, Flex, Heading, Img, Txt
} from 'rendition'
import styled from 'styled-components'
import hexToRgba from 'hex-to-rgba'
import {
  GoogleMap, LoadScript, Marker
} from '@react-google-maps/api'
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faLightbulb,
  faAt,
  faStar,
  faFlagCheckered,
  faFootballBall
} from '@fortawesome/free-solid-svg-icons'

// Coordinates of Seattle, avoid having the map centered in the middle of the sea
const DEFAULT_LATLNG = {
  lat: 47.6062,
  lng: -122.3321
}
const DEFAULT_ZOOM_LEVEL = 3
const DETAIL_ZOOM_LEVEL = 12

const defaultMapOptions = {
  controlSize: 32,
  scrollwheel: false,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
  mapTypeControlOptions: {
    mapTypeIds: [ 'roadmap', 'hybrid' ]
  },
  styles: [
    {
      elementType: 'all',
      featureType: 'all',
      stylers: [
        {
          saturation: -50
        }
      ]
    },
    {
      elementType: 'all',
      featureType: 'administrative.country',
      stylers: [
        {
          gamma: 2
        }
      ]
    },
    {
      elementType: 'all',
      featureType: 'administrative.locality',
      stylers: [
        {
          gamma: 1.5
        }
      ]
    }
  ]
}

// Return map bounds based on list of markers
const getMapBounds = (markers) => {
  // eslint-disable-next-line no-undef
  const bounds = new google.maps.LatLngBounds()

  markers.forEach((marker) => {
    bounds.extend(
      // eslint-disable-next-line no-undef
      new google.maps.LatLng(
        isNaN(marker.lat) ? 0 : marker.lat,
        isNaN(marker.lng) ? 0 : marker.lng
      )
    )
  })
  return bounds
}

// Fit map to its bounds after the api is loaded
const onGoogleMapsApiLoad = (map, markers) => {
  if (markers.length) {
    const bounds = getMapBounds(markers)
    map.fitBounds(bounds)
  } else {
    map.setCenter(DEFAULT_LATLNG)
    map.setZoom(DEFAULT_ZOOM_LEVEL)
  }

  // These options depend on the global "google" object, so we set it once the API has loaded.
  map.setOptions({
    zoomControlOptions: {
      // eslint-disable-next-line no-undef
      position: google.maps.ControlPosition.TOP_RIGHT,
      // eslint-disable-next-line no-undef
      style: google.maps.ZoomControlStyle.SMALL
    }
  })

  // If we run `setZoom` right after `fitBounds` the map won't refresh.
  // With this we first wait for the map to be idle (from fitBounds), and then set the zoom level.
  // eslint-disable-next-line no-undef
  const listener = google.maps.event.addListenerOnce(map, 'idle', () => {
    // Don't allow to zoom closer than the defailt detail zoom level on initial load.
    if (map.getZoom() > DETAIL_ZOOM_LEVEL) {
      map.setZoom(DETAIL_ZOOM_LEVEL)
    }

    // eslint-disable-next-line no-undef
    google.maps.event.removeListener(listener)
  })
}

const AvatarBox = styled(Box) `
  width: 380px;
  max-width: 100%;
  box-shadow: 0 10px 0
      ${(props) => {
    return hexToRgba(props.theme.colors.primary.main, 0.1)
  }},
    4px 4px 0 0
      ${(props) => {
    return props.theme.colors.primary.main
  }};
`
export const variants = (metadata) => {
  const combinations = []

  if (!metadata.data.isHumanRepo) return []

  combinations.push({
    userDetails: metadata.data.balena.yml
  })

  return combinations
}
export const name = 'UserInfo'

export const render = (props, _analytics, config) => {
  const {
    envVars: {
      googleMapsKey: apiKey
    }
  } = config
  const markers = [
    {
      lat: '',
      lng: ''
    }
  ]
  return (
    <Flex flexDirection="column" width="100%">
      <Box bg="primary.main" height="375px" width="100%">
        <Box height="100%">
          {apiKey && (
            <LoadScript
              googleMapsApiKey={apiKey}
              version="3.41"
              language="en"
              preventGoogleFontsLoading
            >
              <GoogleMap
                mapContainerStyle={{
                  height: '100%',
                  minHeight: '300px',
                  opacity: 1
                }}
                options={defaultMapOptions}
                // eslint-disable-next-line react/jsx-no-bind
                onLoad={(map) => {
                  return onGoogleMapsApiLoad(map, markers)
                }}
              >
                {markers.map((_, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: DEFAULT_LATLNG.lat,
                        lng: DEFAULT_LATLNG.lng
                      }}
                      clickable={false}
                    />
                  )
                })}
              </GoogleMap>
            </LoadScript>
          )}
        </Box>
      </Box>
      <Box marginTop="-172px" style={{
        zIndex: 1
      }}>
        <Container>
          <Flex justifyContent="space-between">
            <Flex width={380} flexDirection="column">
              <AvatarBox>
                <Img
                  src={props.userDetails.data.profile_photo.base64}
                  style={{
                    width: 380
                  }}
                />
              </AvatarBox>
              <Flex flexDirection="column">
                <Heading.h3
                  fontSize="34px"
                  style={{
                    fontWeight: 400
                  }}
                  pt={4}
                  pb={1}
                >
                  {props.userDetails.data.name}
                </Heading.h3>
                <Txt fontSize="14px" pb={3} color="text.light">
                  @{props.userDetails.handle}
                </Txt>
                <Txt fontSize="20px" py={1} color="primary.main">
                  {props.userDetails.data.hard_problem}
                </Txt>
                <Txt fontSize="14px">My hard problem to solve at balena</Txt>
              </Flex>
            </Flex>
            <Flex flexDirection="column" pt="245px" pl={5}>
              <Flex align="center" justifyContent="space-between">
                <Box width={1 / 3}>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faUserCircle} />
                    </Txt.span>
                    Nickname
                  </Txt>
                  <Txt>{props.userDetails.data.nickname}</Txt>
                </Box>
                <Box width={1 / 3}>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faLightbulb} />
                    </Txt.span>
                    Pronouns
                  </Txt>
                  <Txt>{props.userDetails.data.pronouns.join('/')}</Txt>
                </Box>
                <Box width={1 / 3}>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faAt} />
                    </Txt.span>
                    Handle
                  </Txt>
                  <Txt>@{props.userDetails.handle}</Txt>
                </Box>
              </Flex>
              <Divider type="dashed" />

              <Flex flexDirection="column">
                <Box>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faStar} />
                    </Txt.span>
                    Current State
                  </Txt>
                </Box>
                <Flex flexWrap="wrap">
                  {props.userDetails.data['current-state'].map(
                    (currentSkill) => {
                      return (
                        <Box width={1 / 3} key={currentSkill}>
                          <Txt>
                            <li>{currentSkill}</li>
                          </Txt>
                        </Box>
                      )
                    }
                  )}
                </Flex>
              </Flex>
              <Divider type="dashed" />
              <Flex flexDirection="column">
                <Box>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faFlagCheckered} />
                    </Txt.span>
                    Target State
                  </Txt>
                </Box>
                <Flex flexWrap="wrap">
                  {props.userDetails.data['target-state'].map(
                    (currentSkill) => {
                      return (
                        <Box width={1 / 3} key={currentSkill}>
                          <Txt>{currentSkill}</Txt>
                        </Box>
                      )
                    }
                  )}
                </Flex>
              </Flex>
              <Divider type="dashed" />

              <Flex flexDirection="column">
                <Box>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faFootballBall} />
                    </Txt.span>
                    Short Bio
                  </Txt>
                </Box>
                <Txt.p>{props.userDetails.data.short_bio}</Txt.p>
                <Txt.span fontSize={2} color="primary.dark" italic>
                  {props.userDetails.data.interests.join(', ')}
                </Txt.span>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Flex>
  )
}
