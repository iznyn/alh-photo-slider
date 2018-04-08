//
// Style helper
//
import _ from 'lodash';

class Style
{
    /**
     * Constructor
     *
     * @param object element
     * @return void
     */
    constructor( element )
    {
        this.element = this._getElement( element );
        this._getAllStyles();
    }

    /**
     * Get all css values
     *
     * @return object
     */
    css()
    {
        return this.css;
    }

    /**
     * Get all attr styles values
     *
     * @return object
     */
    styles()
    {
        return this.styles;
    }

    /**
     * Get style
     *
     * @param string name
     * @return mixed
     */
    getStyle( name )
    {
        let style = false;
        if ( typeof this.styles[name] !== 'undefined' && this.styles[name] != '' ) {
            style = this.styles[name];
        }
        else if ( typeof this.css[name] !== 'undefined' && this.css[name] != '' ) {
            style = this.css[name];
        }
        return style;
    }

    /**
     * Set style
     *
     * @param string name
     * @param string value
     * @return mixed
     */
    setStyle( name, value )
    {
        if ( typeof this.styles[name] !== 'undefined' ) {
            this.styles[name] = value;
        }
        return this;
    }

    /**
     * Get style size (not include unit)
     *
     * Return false if style is not a number
     *
     * @param string name
     * @return Number
     */
    getStyleSize( name )
    {
        let style = 0;
        let value = 0;
        if ( typeof this.styles[name] !== 'undefined' && this.styles[name] != '' ) {
            value = parseInt( this.styles[name] );
        }
        else if ( typeof this.css[name] !== 'undefined' && this.css[name] != '' ) {
            value = parseInt( this.css[name] );
        }
        if ( ! isNaN( value )) {
            style = value;
        }
        return style;
    }

    /**
     * Get padding vertical size
     *
     * @return void
     */
    paddingY()
    {
        let padding = 0;
        let paddingTop = this.getStyleSize( 'paddingTop' );
        if ( paddingTop ) {
            padding += paddingTop;
        }
        let paddingBottom = this.getStyleSize( 'paddingBottom' );
        if ( paddingBottom ) {
            padding += paddingBottom;
        }
        return padding;
    }

    /**
     * Get padding horizontal size
     *
     * @return void
     */
    paddingX()
    {
        let padding = 0;
        let paddingLeft = this.getStyleSize( 'paddingLeft' );
        if ( paddingLeft ) {
            padding += paddingLeft;
        }
        let paddingRight = this.getStyleSize( 'paddingRight' );
        if ( paddingRight ) {
            padding += paddingRight;
        }
        return padding;
    }

    /**
     * Get all styles
     *
     * @return void
     */
    _getAllStyles( name )
    {
        this.styles = this.element.style;
        this.css = window.getComputedStyle( this.element );
    }

    /**
     * Get element
     *
     * @param String|NodeList element
     * @param String|NodeList parent
     * @return void
     */
    _getElement( element, parent = false )
    {
        var el = false;
        if ( _.isElement( element )) {
            el = element;
        }
        else if ( _.isString( element ))
        {
            if ( parent ) {
                let parEl = this._getElement( parent );
                el = parEl.querySelector( element );
            }
            else {
                el = document.querySelector( element );
            }
        }
        return el;
    }

};

export default Style;
