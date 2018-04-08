//
// Editor textarea
//
import $ from 'jquery';

class Textarea
{
    /**
     * Class constructor
     *
     * @param object builder
     * @return void
     */
    constructor( builder )
    {
        this.builder = builder;
        this.characters = 0;
        this.maximum = builder.editorLib.config.get( 'maximumCharater' );
        this.selected = '';
    }

    /**
     * Build textarea
     *
     * @return Builder
     */
    build()
    {
        let self = this;
        this.createMain();
        this.createFooter();

        this.element = $( '<div></div>' )
            .addClass( '_textarea' )
            .append(
                $( '<div></div>' )
                    .addClass( '_textarea--inner' )
                    .append(
                        this.main
                    )
                    .append(
                        this.footer
                    )
            );

        return this;
    }

    /**
     * Create main
     *
     * @return void
     */
    createMain()
    {
        let self = this;
        this.input = $( '<textarea></textarea>' )
            .addClass( '_textarea--input' )
            .css( 'fontFamily', 'Arial, sans-serif' )
            //.css( 'min-height', '200px' )
            .keydown(function(e)
            {
                self.onKeyDown( e );
            })
            .keyup(function(e)
            {
                self.onKeyUp( e );
            })
            .mouseup(function(e)
            {
                self.onMouseUp( e );
            });

        this.main = $( '<div></div>' )
            .addClass( '_textarea--main' )
            .append(
                this.input
            );

        return this.main;
    }

    /**
     * Create footer
     *
     * @return void
     */
    createFooter()
    {
        let self = this;
        this.footer = $( '<div></div>' )
            .addClass( '_textarea--footer' )
            .addClass( 'clearfix' )
            .append(
                $( '<div></div>' )
                    .addClass( '_textarea--characters' )
                    .append(
                        $( "<span></span>" )
                            .addClass( '_label' )
                            .text( 'Characters: ' )
                    )
                    .append(
                        $( "<span></span>" )
                            .addClass( '_value' )
                            .text( this.maximum )
                    )
            );

        return this.footer;
    }

    /**
     * Event: onKeyDown
     *
     * @return void
     */
    onKeyDown( event )
    {
        let target = $( event.currentTarget );
        let text = target.val();
        var key = event.keyCode || event.charCode;

        if( key != 8 && key != 46 )
        {
            if ( text.length >= this.maximum ) {
                event.preventDefault();
                return false;
            }
        }
    }

    /**
     * Event: onKeyUp
     *
     * @return void
     */
    onKeyUp( event )
    {
        let target = $( event.currentTarget );
        let text = target.val();
        this.setCharacters( text.length );

        //callback
        let actions = this.builder.editorLib.config.get( 'actions' );
        if ( typeof actions['change:text'] === 'function' )
        {
            actions['change:text']( text, this.builder, this.builder.editorLib );
        }
    }

    /**
     * Event: onMouseUp
     *
     * @return void
     */
    onMouseUp( event )
    {
        // this.selected = (document.all) ? document.selection.createRange().text : document.getSelection();
        // return this.selected;
    }

    /**
     * Set characters
     *
     * @return void
     */
    setCharacters( count )
    {
        let total = this.maximum - count;
        $( '._textarea--characters ._value', this.footer )
            .text( total );
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

    /**
     * Get main element
     *
     * @return void
     */
    getMainElement()
    {
        return this.main;
    }

    /**
     * Get input element
     *
     * @return void
     */
    getInputElement()
    {
        return this.input;
    }

    /**
     * Get footer element
     *
     * @return void
     */
    getFooterElement()
    {
        return this.footer;
    }
};

export default Textarea;
