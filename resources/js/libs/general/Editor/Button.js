//
// Editor Toolbar
//
import $ from 'jquery';

class Button
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor( name, content, event, afterBuild = null, submenu = false )
    {
        this.name = name;
        this.content = content;
        this.event = event;
        this.afterBuild = afterBuild;
        this.submenu = submenu;
    }

    /**
     * Build textarea
     *
     * @return Builder
     */
    build()
    {
        let button = $( '<div></div>' )
            .addClass( '_button' )
            .addClass( '_button--'+this.name )
            .attr( 'data-name', this.name );

        button = this.addContent( button );
        button = this.addSubmenu( button );
        button = this.addEvent( button );

        if ( this.afterBuild ) {
            button = this.afterBuild( this, button );
        }

        return button;
    }

    /**
     * Add content
     *
     * @param object button
     * @return Builder
     */
    addContent( button )
    {
        button
            .append(
                $( '<div></div>' )
                    .addClass( '_button--trigger' )
                    .append(
                        $( '<div></div>' )
                            .addClass( '_button--label' )
                            .html( this.content )
                    )
            );

        return button;
    }

    /**
     * Add submenu
     *
     * @param object button
     * @return Builder
     */
    addSubmenu( button )
    {
        if ( this.submenu )
        {
            button
                .addClass( '_has--submenu' )
                .append(
                    $( '<div></div>' )
                        .addClass( '_submenu' )
                        .html( this.submenu )
                )
                .append(
                    $( '<input/>' )
                        .attr( 'type', 'hidden' )
                        .attr( 'name', this.name )
                        .addClass( '_storage' )
                );
        }

        return button;
    }

    /**
     * Add event
     *
     * @param object button
     * @return Builder
     */
    addEvent( button )
    {
        let self = this;
        button.click( function(e)
        {
            self.event( $(this), e );
            return false;
        });
        return button;
    }
};

export default Button;
