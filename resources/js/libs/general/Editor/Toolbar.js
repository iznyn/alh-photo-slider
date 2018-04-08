//
// Editor Toolbar
//
import $ from 'jquery';
import Button from './Button';

class Toolbar
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
    }

    /**
     * Build textarea
     *
     * @return Builder
     */
    build()
    {
        let buttons = this.getButtons();
        this.element = $( '<div></div>' )
            .addClass( '_toolbar' )
            .append(
                this.getHeader()
            )
            .append(
                $( '<div></div>' )
                    .addClass( '_toolbar--main' )
                    .append(
                        buttons
                    )
            );

        return this;
    }

    /**
     * Get header
     *
     * @return object
     */
    getHeader()
    {
        let header = '';
        let element = this.builder.getElement();
        let dataTitle = element.attr( 'data-title' );
        if ( typeof dataTitle != 'undefined' )
        {
            header = $( '<div></div>' )
                .addClass( '_toolbar--header' )
                .append(
                    $( '<h2></h2>')
                        .addClass( '_title' )
                        .text( dataTitle )
                );
        }

        return header;
    }

    /**
     * Get buttons
     *
     * @return Builder
     */
    getButtons()
    {
        let buttons = $( '<div></div>' )
            .addClass( '_toolbar--buttons' )
            .append( this.getButtonFont() )
            .append( this.getButtonColor() )
            .append( this.getButtonAlignments() );

        return buttons;
    }

    /**
     * Get button font
     *
     * @return Builder
     */
    getButtonFont()
    {
        return new Button(
            'font',
            '<span class="_current--label">Font Type</span>',
            ( button, event ) => this.actionFont( button, event ),
            false,
            this.getFontSubmenu()

        ).build();
    }

    /**
     * Get button color
     *
     * @return Builder
     */
    getButtonColor()
    {
        return new Button(
            'color',
            '<i class="fa fa-font"></i><span class="_color--indicator"></span>',
            ( button, event ) => this.actionColor( button, event ),
            false,
            this.getColorSubmenu()

        ).build();
    }

    /**
     * Get button alignments
     *
     * @return Builder
     */
    getButtonAlignments()
    {
        return $( '<div></div>' )
            .addClass( '_button--group' )
            .append( this.getButtonAlignLeft() )
            .append( this.getButtonAlignCenter() )
            .append( this.getButtonAlignRight() );
    }

    /**
     * Get button align left
     *
     * @return Builder
     */
    getButtonAlignLeft()
    {
        return new Button(
            'align-left',
            '<i class="fa fa-align-left"></i>',
            ( button, event ) => this.actionAlignLeft( button, event )

        ).build();
    }

    /**
     * Get button align right
     *
     * @return Builder
     */
    getButtonAlignRight()
    {
        return new Button(
            'align-right',
            '<i class="fa fa-align-right"></i>',
            ( button, event ) => this.actionAlignRight( button, event )

        ).build();
    }

    /**
     * Get button align center
     *
     * @return Builder
     */
    getButtonAlignCenter()
    {
        return new Button(
            'align-center',
            '<i class="fa fa-align-center"></i>',
            ( button, event ) => this.actionAlignCenter( button, event )

        ).build();
    }

    /**
     * Action font
     *
     * @param object button
     * @param object event
     * @return void
     */
    actionFont( button, event )
    {
    }

    /**
     * Action color
     *
     * @param object button
     * @param object event
     * @return void
     */
    actionColor( button, event )
    {
    }

    /**
     * Action align left
     *
     * @param object button
     * @param object event
     * @return void
     */
    actionAlignLeft( button, event )
    {
        this.resetButtonAlign( button, event );
        this.setTextStyle( 'text-align', 'left' );
        this.callbackAlign( 'left', button );
    }

    /**
     * Action align right
     *
     * @param object button
     * @param object event
     * @return void
     */
    actionAlignRight( button, event )
    {
        this.resetButtonAlign( button, event );
        this.setTextStyle( 'text-align', 'right' );
        this.callbackAlign( 'right', button );
    }

    /**
     * Action align center
     *
     * @param object button
     * @param object event
     * @return void
     */
    actionAlignCenter( button, event )
    {
        this.resetButtonAlign( button, event );
        this.setTextStyle( 'text-align', 'center' );
        this.callbackAlign( 'center', button );
    }

    /**
     * Reset button align
     *
     * @param object button
     * @param object event
     * @return void
     */
    resetButtonAlign( button, event )
    {
        let btngroup = button.parents( '._button--group' );
        $( '._button', btngroup ).removeClass( '_active' );

        this.activeButton( button );
    }

    /**
     * Callback align
     *
     * @param string align
     * @param object button
     * @return void
     */
    callbackAlign( align, button )
    {
        let actions = this.builder.editorLib.config.get( 'actions' );
        if ( typeof actions['select:align'] === 'function' )
        {
            actions['select:align']( align, this.builder, this.builder.editorLib );
        }
    }

    /**
     * Active button
     *
     * @param object button
     * @return void
     */
    activeButton( button, event )
    {
        button.addClass( '_active' );
    }

    /**
     * Set text style
     *
     * @param string name
     * @param string value
     * @return void
     */
    setTextStyle( name, value )
    {
        let input = $( '._textarea ._textarea--input', this.builder.getElement() );
        input.css( name, value );
    }

    /**
     * Setup submenu color
     *
     * @return void
     */
    getColorSubmenu()
    {
        let items = $( '<div></div>' ).addClass( '_items' );
        let colors = this.getColors();
        for( let i = 0; i < colors.length; i++ )
        {
            items.append(
                $( '<div></div>')
                    .addClass( '_item' )
                    .attr( 'data-value', colors[i].color )
                    .append(
                        $( '<span></span>' )
                            .css( 'backgroundColor', colors[i].color )
                            .addClass( '_color' )
                    )
                    .append(
                        $( '<span></span>' )
                            .addClass( '_label' )
                            .text( colors[i].title )
                    )
            );
        }
        return items;
    }

    /**
     * Setup submenu font
     *
     * @return void
     */
    getFontSubmenu()
    {
        let items = $( '<div></div>' ).addClass( '_items' );
        let fonts = this.getFonts();
        for( let i = 0; i < fonts.length; i++ )
        {
            items.append(
                $( '<div></div>')
                    .addClass( '_item' )
                    .css( 'font-family', fonts[i].title )
                    .attr( 'data-value', fonts[i].title )
                    .text( fonts[i].title )
            );
        }
        return items;
    }

    /**
     * Get colors
     *
     * @return array
     */
    getColors()
    {
        let colors = [
            {
                "id": 1,
                "color": "#ED1C24",
                "title": "Red"
            },
            {
                "id": 2,
                "color": "#21409A",
                "title": "Blue"
            },
            {
                "id": 3,
                "color": "#EC008C",
                "title": "Pink"
            },
            {
                "id": 4,
                "color": "#00A14B",
                "title": "Green"
            },
            {
                "id": 5,
                "color": "#7f3f98",
                "title": "Purple"
            },
            {
                "id": 6,
                "color": "#000000",
                "title": "Black"
            }
        ];
        return colors;
    }

    /**
     * Get fonts
     *
     * @return array
     */
    getFonts()
    {
        let fonts = [
            {
                "id": 1,
                "title": "Arial"
            },
            {
                "id": 2,
                "title": "Times New Roman"
            },
            {
                "id": 3,
                "title": "ComicSansMS"
            },
            {
                "id": 4,
                "title": "BrushScriptMT"
            },
            {
                "id": 5,
                "title": "方正粗圆简体"
            }
        ];
        return fonts;
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

export default Toolbar;
