//
// Dom Element
//
import _ from 'lodash';
import Style from './Style.js';

class Element extends Style
{
    /**
     * Constructor
     *
     * @param object element
     * @return void
     */
    constructor( element )
    {
        super( element )
    }

    /**
     * Add event listener to all elements
     *
     * @param string eventName
     * @param object callback
     * @return Dom
     */
    on( eventName, callback )
    {
        this.element.addEventListener( eventName, (ev) => {
            return callback( this.element, ev );
        });
        return this;
    }

    /**
     * Set attr
     *
     * @param string name
     * @param mixed value
     * @return void
     */
    setAttr( name, value )
    {
        this.element.setAttribute( name, value );
        return this;
    }

    /**
     * Get attr
     *
     * @return void
     */
    getAttr( name )
    {
        return this.element.getAttribute( name );
    }

    /**
     * Set id
     *
     * @return void
     */
    setId( id )
    {
        this.setAttr( 'id', id );
        return this;
    }

    /**
     * Get id
     *
     * @return void
     */
    getId()
    {
        return this.getAttr( 'id' );
    }

    /**
     * Get element class
     *
     * @return array
     */
    getClass()
    {
        return this.getAttr( 'class' );
    }

    /**
     * Get element classes
     *
     * @return array
     */
    getClasses()
    {
        let classStr = this.getAttr( 'class' );
        let classes = _.split( classStr, ' ' );
        return classes;
    }

    /**
     * Set element class
     *
     * @return array
     */
    setClass( className )
    {
        return this.setAttr( 'class', className );
    }

    /**
     * Add element class
     *
     * @return array
     */
    addClass( className )
    {
        let classes = this.getClasses();
        classes.push( className );
        let classStr = _.join( classes, ' ' );
        this.setAttr( 'class', classStr );

        return this;
    }

    /**
     * Remove element class
     *
     * @return array
     */
    removeClass( className )
    {
        let classes = this.getClasses();
        _.remove( classes, (val) => {
            return val == className;
        });

        let classStr = _.join( classes, ' ' );
        this.setAttr( 'class', classStr );

        return this;
    }

    /**
     * Remove element class
     *
     * @return array
     */
    hasClass( className )
    {
        let classes = this.getClasses();
        let indexof = _.indexOf( classes, className );
        if ( indexof == -1 ) {
            return false;
        }
        return true;
    }

    /**
     * Get bounding client
     *
     * @return object
     */
    getBounding()
    {
        return this.element.getBoundingClientRect();
    }

    /**
     * Hiding element
     *
     * @return object
     */
    hide()
    {
        this.setStyle( 'display', 'none' );
        return this;
    }

    /**
     * Hiding element
     *
     * @return object
     */
    show( type = 'block' )
    {
        this.setStyle( 'display', type );
        return this;
    }


    /**
     * Get top position relative to page
     *
     * @return object
     */
    top()
    {
        let el = this.element;
        let top = 0;
        do {
            if ( !isNaN( el.offsetTop ) )
            {
              top += el.offsetTop;
            }
        } while( el = el.offsetParent );

        return top;
    }

    /**
     * Get top position relative to closest element
     *
     * @return object
     */
    offsetTop()
    {
        return this.element.offsetTop;
    }

    /**
     * Get left position relative to page
     *
     * @return object
     */
    left()
    {
        let el = this.element;
        let left = 0;
        do {
            if ( !isNaN( el.offsetLeft ) )
            {
              left += el.offsetLeft;
            }
        } while( el = el.offsetParent );

        return left;
    }

    /**
     * Get left position relative to closest element
     *
     * @return object
     */
    offsetLeft()
    {
        return this.element.offsetLeft;
    }

    /**
     * Get height (including padding+border)
     *
     * @return object
     */
    height()
    {
        return this.element.offsetHeight;
    }

    /**
     * Get width (including padding+border)
     *
     * @return object
     */
    width()
    {
        return this.element.offsetWidth;
    }

    /**
     * Get height (including padding+border)
     *
     * @return object
     */
    clientHeight()
    {
        return this.element.clientHeight;
    }

    /**
     * Get width (including padding)
     *
     * @return object
     */
    clientWidth()
    {
        return this.element.clientWidth;
    }

    /**
     * Get height
     *
     * @return object
     */
    innerHeight()
    {
        let height = this.clientHeight();
        let padding = this.paddingY();
        height -= padding;

        return height;
    }

    /**
     * Get width
     *
     * @return object
     */
    innerWidth()
    {
        let width = this.clientWidth();
        let padding = this.paddingX();
        width -= padding;

        return width;
    }
};

export default Element;
