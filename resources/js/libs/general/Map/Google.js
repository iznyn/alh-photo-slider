//
// Map
//
import $ from 'jquery';
import _ from 'lodash';

class MapGoogle
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor()
    {
        this.center = {};
        this.selector = '.map--view';

        this.zoom = 12;
        this.map = false;
        this.marker = false;
    }

    /**
     * Init
     *
     * @return mixed
     */
    init()
    {
        //Init size
        this.initSize();

        //Init map
        this.initMap();

        return this;
    }

    /**
     * Init size
     *
     * @return void
     */
    initSize()
    {
    }

    /**
     * Init map
     *
     * @return void
     */
    initMap()
    {
        //Init map
        let mapStyle = this.getMapStyle();
        let mapOptions = {
            disableDefaultUI: true,
            zoom: this.zoom,
            center: this.center
        };
        if ( mapStyle ) {
          mapOptions.styles = mapStyle;
        }

        let map = new google.maps.Map(document.querySelector( this.selector ), mapOptions );
        this.map = map;

        //Add marker
        this.marker = this.addMapMarkers();
    }

    /**
     * Add map markers
     *
     * @return object
     */
    addMapMarkers()
    {
        let self = this;
        let markerOptions = {
            position: this.center,
            map: this.map
        };
        let mapIcon = this.getMapIconDefault();
        if ( mapIcon ) {
          markerOptions.icon = mapIcon;
        }

        let marker = new google.maps.Marker( markerOptions );

        return marker;
    }

    /**
     * Get map style
     *
     * @return array
     */
    getMapStyle()
    {
      let style = false;
      return style;
    }

    /**
     * Reset map markers
     *
     * @param int iconSize
     * @return mixed
     */
     removeMarkers()
     {
       if ( this.mapMarkers.length > 0 ) {
         for ( var i = 0; i < this.mapMarkers.length; i++ ) {
           this.mapMarkers[i].setMap( null );
         }
       }
       this.mapMarkers = [];
     }

    /**
     * Get map icon default
     *
     * @param int iconSize
     * @return mixed
     */
    getMapIconDefault( iconSize )
    {
        // if ( typeof iconSize === 'undefined' ) {
        //     iconSize = 10;
        // }
        // let iconOptions = {
        //     path: google.maps.SymbolPath.CIRCLE,
        //     fillColor: '#9d2235',
        //     fillOpacity: .8,
        //     scale: iconSize,
        //     strokeColor: 'transparent',
        //     strokeWeight: .5
        // };
        let iconOptions = false;
        return iconOptions;
    }
};

export default MapGoogle;
