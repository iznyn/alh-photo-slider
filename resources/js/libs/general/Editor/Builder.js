//
// Editor builder
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';
import Toolbar from './Toolbar';
import Textarea from './Textarea';

class Builder
{
    /**
     * Class constructor
     *
     * @param object element
     * @param object editorLib
     * @return void
     */
    constructor( element, editorLib )
    {
        this.element = element;
        this.editorLib = editorLib;
    }

    /**
     * Build texteditor
     *
     * @return Builder
     */
    build()
    {
        let wrapper = this.getWrapper();
        let textarea = this.getTextarea();
        let toolbar = this.getToolbar();

        wrapper.append( toolbar.getElement() );
        wrapper.append( textarea.getElement() );
        this.appendTo( wrapper );

        return this;
    }

    /**
     * Get wrapper
     *
     * @return object
     */
    getWrapper()
    {
        let wrapper = $( '<div></div>' )
            .addClass( '_wrapper' );

        this.wrapper = wrapper;
        return wrapper;
    }

    /**
     * Get toolbar
     *
     * @return object
     */
    getToolbar()
    {
        let toolbar = new Toolbar( this );
        toolbar.build();

        this.toolbar = toolbar;
        return toolbar;
    }

    /**
     * Get textarea
     *
     * @return object
     */
    getTextarea()
    {
        let textarea = new Textarea( this );
        textarea.build();

        this.textarea = textarea;
        return textarea;
    }

    /**
     * Append to
     *
     * @param object wrapper
     * @return void
     */
    appendTo( wrapper )
    {
        wrapper.appendTo( this.element );
    }

    /**
     * Get element
     *
     * @return void
     */
    getElement()
    {
        return this.element;
    }
};

export default Builder;
