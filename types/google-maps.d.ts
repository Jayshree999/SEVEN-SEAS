/**
 * Google Maps TypeScript Definitions
 * Extends the Window interface to include Google Maps API
 */

interface Window {
  google?: {
    maps: {
      Map: new (element: HTMLElement, options?: google.maps.MapOptions) => google.maps.Map
      Marker: new (options?: google.maps.MarkerOptions) => google.maps.Marker
      InfoWindow: new (options?: google.maps.InfoWindowOptions) => google.maps.InfoWindow
      Animation: {
        DROP: number
        BOUNCE: number
      }
      places: {
        AutocompleteService: new () => google.maps.places.AutocompleteService
        PlacesService: new (attrContainer: HTMLElement) => google.maps.places.PlacesService
      }
    }
  }
}

declare namespace google {
  namespace maps {
    interface MapOptions {
      center?: LatLng | LatLngLiteral
      zoom?: number
      mapTypeControl?: boolean
      streetViewControl?: boolean
      fullscreenControl?: boolean
      zoomControl?: boolean
      styles?: MapTypeStyle[]
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral
      map?: Map
      title?: string
      animation?: number
    }

    interface InfoWindowOptions {
      content?: string | HTMLElement
    }

    interface LatLng {
      lat(): number
      lng(): number
    }

    interface LatLngLiteral {
      lat: number
      lng: number
    }

    interface MapTypeStyle {
      featureType?: string
      elementType?: string
      stylers?: Array<{ [key: string]: any }>
    }

    class Map {
      constructor(element: HTMLElement, options?: MapOptions)
    }

    class Marker {
      constructor(options?: MarkerOptions)
      addListener(event: string, handler: () => void): void
    }

    class InfoWindow {
      constructor(options?: InfoWindowOptions)
      open(map: Map, marker: Marker): void
    }

    namespace places {
      interface AutocompleteService {
        getPlacePredictions(
          request: AutocompleteRequest,
          callback: (predictions: AutocompletePrediction[], status: PlacesServiceStatus) => void
        ): void
      }

      interface PlacesService {
        getDetails(
          request: PlacesDetailsRequest,
          callback: (place: PlaceResult, status: PlacesServiceStatus) => void
        ): void
      }

      interface AutocompleteRequest {
        input: string
        types?: string[]
        location?: LatLngLiteral
        radius?: number
      }

      interface AutocompletePrediction {
        description: string
        place_id: string
        structured_formatting: {
          main_text: string
          secondary_text: string
        }
      }

      interface PlacesDetailsRequest {
        placeId: string
        fields?: string[]
      }

      interface PlaceResult {
        name?: string
        formatted_address?: string
        geometry?: {
          location: {
            lat(): number
            lng(): number
          }
        }
        rating?: number
        user_ratings_total?: number
        reviews?: Review[]
      }

      interface Review {
        author_name: string
        author_url?: string
        profile_photo_url?: string
        rating: number
        text: string
        time: number
        relative_time_description: string
      }

      enum PlacesServiceStatus {
        OK = 'OK',
        ZERO_RESULTS = 'ZERO_RESULTS',
        NOT_FOUND = 'NOT_FOUND',
        REQUEST_DENIED = 'REQUEST_DENIED',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        INVALID_REQUEST = 'INVALID_REQUEST',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
      }
    }
  }
}


