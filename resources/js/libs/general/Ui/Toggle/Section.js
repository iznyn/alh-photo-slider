//
// UI helper
//
import $ from 'jquery';
import 'jquery.transit';
import Toggle from './../Toggle';
import Config from './../../Config';

class Section extends Toggle
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor( settings = {} )
    {
        super( settings );
    }

    /**
     * Setup toggle
     *
     * @return void
     */
    setup()
    {
        //prepare
        this.prepare();

        //trigger event
        this.trigger();

        //resize
        this.resize();
    }

    /**
     * Prepare toggle
     *
     * @return void
     */
    prepare()
    {
        //set height
        this.setHeight();

        //preparing detail section
        let detail = $( this.config.get( 'detailClass' ), this.container );
        if ( detail.length > 0 )
        {
            //positioning detail
            let direction = this.config.get( 'direction' );
            if ( direction == 'top' ) {
                detail.css({y: '-110%'});
            }
            else if ( direction == 'bottom' ) {
                detail.css({y: '110%'});
            }
            else if ( direction == 'left' ) {
                detail.css({x: '110%'});
            }
            else {
                detail.css({x: '-110%'});
            }
        }

        //try to open if has class _shown
        this.firstOpen();
    }

    /**
     * First open detail section
     *
     * @return void
     */
    setHeight()
    {
        //preparing main section height
        let main = $( this.config.get( 'mainClass' ), this.container );
        if ( main.length > 0 )
        {
            main.show();
            main.attr( 'data-height', main.outerHeight() );
        }

        //preparing detail section height
        let detail = $( this.config.get( 'detailClass' ), this.container );
        if ( detail.length > 0 )
        {
            detail.show();
            detail.attr( 'data-height', detail.outerHeight() );
            detail.hide();
        }
    }

    /**
     * First open detail section
     *
     * @return void
     */
    firstOpen()
    {
        let container = this.container;
        if ( container.hasClass( '_shown' )) {
            this.openAnimation();
        }
    }

    /**
     * Open event handler
     *
     * @return void
     */
    trigger()
    {
        //open
        this.open();

        //close
        this.close();
    }

    /**
     * Open resize
     *
     * @return void
     */
    resize()
    {
        $(window).resize((e) => {

            this.setHeight();
        })
    }

    /**
     * Open event handler
     *
     * @return void
     */
    open()
    {
        let self = this;
        let trigger = $( this.config.get( 'openClass' ), this.container );
        if ( trigger.length > 0 )
        {
            trigger.click( function()
            {
                self.openAnimation( $(this) );
                return false;
            });
        }
    }

    /**
     * Close event handler
     *
     * @return void
     */
    close()
    {
        let self = this;
        let trigger = $( this.config.get( 'closeClass' ), this.container );
        if ( trigger.length > 0 )
        {
            trigger.click( function()
            {
                self.closeAnimation( $(this) );
                return false;
            });
        }
    }

    /**
     * Open animation
     *
     * @return void
     */
    openAnimation()
    {
        let self = this;

        //add/remove class
        this.container.removeClass( '_hidden' );
        this.container.removeClass( '_hide' );
        this.container.addClass( '_showing' );

        //run animation
        let detail = $( this.config.get( 'detailClass' ), this.container );
        if ( detail.length > 0 )
        {
            let height = parseInt( detail.attr( 'data-height' ) );
            let duration = this.config.get( 'openDuration' );
            let direction = this.config.get( 'direction' );

            //animating container
            this.container.animate({
                height: height
            }, 300, function()
            {
                detail.show();
                let animAttr = {
                    duration: duration,
                    complete: function()
                    {
                        self.container.removeClass( '_showing' );
                        self.container.addClass( '_shown' );
                        self.openComplete();
                    }
                };
                if ( direction == 'top' || direction == 'bottom' ) {
                    animAttr.y = 0
                }
                else {
                    animAttr.x = 0
                }
                detail.transition( animAttr );
            });


        }

    }

    /**
     * Close animation
     *
     * @return void
     */
    closeAnimation()
    {
        let self = this;
        let container = this.container;
        //add/remove class
        container.removeClass( '_showing' );
        container.removeClass( '_shown' );
        container.addClass( '_hide' );

        //run animation
        let main = $( this.config.get( 'mainClass' ), this.container );
        let detail = $( this.config.get( 'detailClass' ), this.container );
        if ( main.length > 0 && detail.length > 0 )
        {
            let height = parseInt( main.attr( 'data-height' ) );
            let duration = this.config.get( 'openDuration' );
            let direction = this.config.get( 'direction' );

            //animating detail
            let animAttr = {
                duration: duration,
                complete: function()
                {
                    container.removeClass( '_hide' );
                    container.addClass( '_hidden' );
                    detail.hide();

                    container.animate({
                        height: height
                    }, 200);

                    self.closeComplete();
                }
            };

            if ( direction == 'top' ) {
                animAttr.y = '-110%';
            }
            else if ( direction == 'bottom' ) {
                animAttr.y = '110%';
            }
            else if ( direction == 'left' ) {
                animAttr.x = '110%';
            }
            else {
                animAttr.x = '-110%';
            }
            detail.transition( animAttr );
        }
    }

    /**
     * After opening detail
     *
     * @return void
     */
    openComplete()
    {
    }

    /**
     * After closing detail
     *
     * @return void
     */
    closeComplete()
    {
    }

    /**
     * Get default settings
     *
     * @return object
     */
    _getDefaultSettings()
    {
        let settings = {
            containerClass: '.ui__toggle',
            openClass: '._trigger--open',
            closeClass: '._trigger--close',
            mainClass: '._section--main',
            detailClass: '._section--detail',
            openDuration: 800,
            closeDuration: 600,
            direction: 'right'
        };
        return settings;
    }

};

export default Section;
