//
// UI helper
//
import 'jquery.transit';
import Pikaday from 'pikaday';
import momentLib from 'moment';

class CalendarEvent
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor()
    {
        this.container = $( '.event--main' );
        this.calendarContainer = $( '.event--calendar ._calendar--container' );
    }

    /**
     * Setup
     *
     * @return void
     */
    setup()
    {
        if ( this.container.length < 1 ) {
            return false;
        }

        let self = this;
        let field = $( '.event--calendar ._date--storage', this.container ).get(0);
        let container = this.calendarContainer.get(0);

        let picker = new Pikaday(
        {
            field: field,
            firstDay: 1,
            minDate: new Date(2000, 0, 1),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2000, 2020],
            bound: false,
            container: container,
            onSelect: function()
            {
                let moment = this.getMoment();
                self.dateSelect( moment );
            }
        });

        //Get next event
        let nextEvent = this.getNextEvent();
        if ( nextEvent )
        {
            let nextDate = nextEvent.attr( 'data-date' );

            //set default picker date
            picker.setDate( nextDate );

            // show next event
            $( '.event--calendar--info ._info--item' ).addClass( '_hidden' );
            nextEvent.removeClass( '_hidden' );
        }

    }

    /**
     * Get next event
     *
     * @return void
     */
    getNextEvent()
    {
        let nextEvent = false;
        let todayMT = momentLib().format( 'X' );

        let eachIdx = 0;
        $( '.event--calendar--info ._info--item' ).each( function()
        {
            let evItem = $(this);
            let evDateStr = evItem.attr( 'data-date' );
            let evTime = momentLib( evDateStr ).format( 'X' );

            if ( eachIdx == 0 ) {
                nextEvent = evItem;
            }
            if ( evTime > todayMT ) {
                nextEvent = evItem;
            }

            eachIdx++;
        });

        if ( nextEvent ) {
            nextEvent = $( nextEvent );
        }

        return nextEvent;
    }

    /**
     * Get event
     *
     * @param string date
     * @return void
     */
    getEvent( date )
    {
        let eventItem = false;

        $( '.event--calendar--info ._info--item' ).each( function()
        {
            let evItem = $(this);
            let evDateStr = evItem.attr( 'data-date' );
            if ( evDateStr == date ) {
                eventItem = evItem;
            }
        });

        if ( eventItem ) {
            eventItem = $( eventItem );
        }

        return eventItem;
    }

    /**
     * Date select
     *
     * @return void
     */
    dateSelect( moment )
    {
        let date = moment.format('YYYY-MM-DD');
        let evItem = this.getEvent( date );

        if ( evItem ) {
            $( '.event--calendar--info ._info--item' ).addClass( '_hidden' );
            evItem.removeClass( '_hidden' );
        }
    }
};

export default CalendarEvent;
