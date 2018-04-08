//
// Dom
//
import _ from 'lodash';
import Element from './Dom/Element.js';

class Dom
{
    /**
     * Constructor
     *
     * @param string selector
     * @return void
     */
    constructor( selector, container = false )
    {
        this.selector = selector;
        this.container = container;
        this.elements = this.el( selector, container);
        if ( this.elements.length > 0 ) {
            this.exists = true;
        }
        else {
            this.exists = false;
        }
    }

    /**
     * Get element
     *
     * @param string selector
     * @return object
     */
    get( index )
    {
        let element = false;
        if ( this.isExists() ) {
            if ( typeof this.elements[index] !== 'undefined' ) {
                element = this.elements[index];
            }
        }
        return element;
    }

    /**
     * Get all elements from a selector
     *
     * @param string selector
     * @param Dom container
     * @return object
     */
    el( selector, container = false )
    {
        let elements = [];
        let finds = [];

        if ( container )
        {
            container.each((e) =>
            {
                let _finds = e.element.querySelectorAll( selector );
                for ( var i = 0; i < _finds.length; i++ ) {
                    finds.push( _finds[i] );
                }
            });
        }
        else {
            finds = document.querySelectorAll( selector );
        }
        if ( finds.length > 0 )
        {
            for ( var i = 0; i < finds.length; i++ )
            {
                let el = new Element( finds[i] );
                elements.push( el );
            }
        }
        return elements;
    }

    /**
     * Manipulating each elements
     *
     * @param object callback
     * @return Dom
     */
    each( callback )
    {
        if ( this.isExists() )
        {
            let elements = this.elements;
            for ( var i = 0; i < elements.length; i++ )
            {
                callback( elements[i] );
            }
        }
        return this;
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
        this.each( (el) =>
        {
            el.element.addEventListener( eventName, (ev) => {

                return callback( el, ev );
            });
        });
        return this;
    }

    /**
     * Add class to all elements
     *
     * @param string className
     * @return Dom
     */
    addClass( className )
    {
        this.each( (e) =>
        {
            e.addClass( className );
        });
        return this;
    }

    /**
     * Add class to all elements
     *
     * @param string className
     * @return Dom
     */
    addClass( className )
    {
        this.each( (e) =>
        {
            e.addClass( className );
        });
        return this;
    }

    /**
     * Add class to all elements
     *
     * @param string className
     * @return Dom
     */
    removeClass( className )
    {
        this.each( (e) =>
        {
            e.removeClass( className );
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
        this.each( (e) =>
        {
            e.setAttr( name, value );
        });
        return this;
    }

    /**
     * Remove attr
     *
     * @param string name
     * @param mixed value
     * @return void
     */
    removeAttr( name, value )
    {
        this.each( (e) =>
        {
            e.removeAttr( name, value );
        });
        return this;
    }

    /**
     * Check element is exists
     *
     * @return boolean
     */
    isExists()
    {
        return this.exists;
    }
};

export default Dom;
