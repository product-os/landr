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

import React, { useState, useEffect } from 'react'
import {
  Box, Container, Divider, Flex, Heading, Img, Txt
} from 'rendition'
import styled from 'styled-components'
import hexToRgba from 'hex-to-rgba'
import {
  GoogleMap, LoadScript, Marker
} from '@react-google-maps/api'
import { NodeGeocoder } from 'node-geocoder';
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
import {
  BlockQuote
} from './presentational/Blockquote'

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
      elementType: 'geometry',
      stylers: [
        {
          color: '#ebe3cd'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#523735'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f1e6'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#c9b2a6'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#dcd2be'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ae9e90'
        }
      ]
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#93817c'
        }
      ]
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#a5b076'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#447530'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f1e6'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#fdfcf8'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f8c967'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#e9bc62'
        }
      ]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e98d58'
        }
      ]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#db8555'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#806b63'
        }
      ]
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8f7d77'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ebe3cd'
        }
      ]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#b9d3c2'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#92998d'
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
const getNameImage = (name) => {
  if (!name) return ''
  const [ firstName, lastName ] = name.split(' ')

  const firstChar = firstName.charAt(0)
  let lastChar = ''

  if (lastName) {
    lastChar = lastName.charAt(0)
  }
  return `${firstChar.toUpperCase()}${lastChar}`
}

const NameAvatar = styled(Txt) `
  width: 380px;
  height: 380px;
  font-size: 300px;
  text-align: center;
  background: white;
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

const latLong = (apiKey, userDetails) => {
  const options = {
    provider: 'google',
    apiKey
  }
  
  return NodeGeocoder(options).geocode(`${userDetails.city}, ${userDetails.country}`)
}

export const render = (props, _analytics, config) => {

  const [markers, setMarkers] = useState([{
    lat: '',
    lng: ''
  }])
  
  const {
    envVars: {
      googleMapsKey: apiKey
    }
  } = config
  
  useEffect(() => {
    (props.userDetails.data.city && props.userDetails.data.country) && latLong(apiKey, props.userDetails.data)
    .then((updatedLatLong) => {
      setMarkers([{
        lat: updatedLatLong.latitude,
        lng: updatedLatLong.longitude
      }])
    })
  }, [props.userDetails.data.city, props.userDetails.data.country, apiKey, setMarkers])

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
      <Box
        marginTop="-172px"
        style={{
          zIndex: 1
        }}
      >
        <Container>
          <Flex>
            <Flex width={380} flexDirection="column">
              <AvatarBox>
                {props.userDetails.data.profile_photo ? (
                  <Img
                    src={props.userDetails.data.profile_photo.base64}
                    style={{
                      width: 380
                    }}
                  />
                ) : (
                  <NameAvatar>
                    {getNameImage(props.userDetails.data.name)}
                  </NameAvatar>
                )}
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
                <BlockQuote py={1}>
                  {props.userDetails.data.hard_problem}
                </BlockQuote>
                <Txt fontSize="14px">My hard problem to solve at balena</Txt>
              </Flex>
            </Flex>
            <Flex
              flexDirection="column"
              pt="245px"
              style={{
                flex: 1
              }}
              pl={'100px'}
            >
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
                  <Txt>
                    {props.userDetails.data.pronouns &&
                      props.userDetails.data.pronouns.join('/')}
                  </Txt>
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
                    Haves
                  </Txt>
                </Box>
                <Flex flexWrap="wrap">
                  {props.userDetails.data.haves &&
                    props.userDetails.data.haves.map((currentSkill) => {
                      return (
                        <Box width={1 / 3} key={currentSkill}>
                          <Txt>
                            <li>{currentSkill}</li>
                          </Txt>
                        </Box>
                      )
                    })}
                </Flex>
              </Flex>
              <Divider type="dashed" />
              <Flex flexDirection="column">
                <Box>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faFlagCheckered} />
                    </Txt.span>
                    Wants
                  </Txt>
                </Box>
                <Flex flexWrap="wrap">
                  {props.userDetails.data.wants &&
                    props.userDetails.data.wants.map((currentSkill) => {
                      return (
                        <Box width={1 / 3} key={currentSkill}>
                          <Txt>
                            <li>{currentSkill}</li>
                          </Txt>
                        </Box>
                      )
                    })}
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
                  {props.userDetails.data.interests &&
                    props.userDetails.data.interests.join(', ')}
                </Txt.span>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Flex>
  )
}
