import React from 'react'
import {
  Box
} from 'rendition'
import {
  GoogleMap, LoadScript, Marker
} from '@react-google-maps/api'

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
  mapTypeControl: false,
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
export const Map = ({
  apiKey, markers
}) => {
  return (
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
  )
}
