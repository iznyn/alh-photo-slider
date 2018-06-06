//
// Menus lib
//
import _C from "lodash/collection";

class Menus
{
    /**
     * Class constructor
     *
     * @param object slide
     * @return void
     */
    constructor(slide)
    {
        this.slide = slide;
        this.container = $('.photo-slide__nav ._nav--images');
    }

    /**
     * Init
     *
     * @return mixed
     */
    init()
    {
        this.createMenus();
        this.menuAction();
    }

    /**
     * Create menu
     *
     * @return mixed
     */
    createMenus()
    {
        let order = CONFIGSLIDERORDER;
        let config = CONFIGSLIDER;

        let dataSlider = [];
        for (var i = 0; i < order.length; i++) {
            let id = order[i];
            let slideConfig = _C.find(config, {id: id});
            if (slideConfig) {
                dataSlider.push(slideConfig);
            }
        }
        this.createMenuItems(dataSlider);
    }

    /**
     * Create slide items
     *
     * @param array items
     * @return mixed
     */
    createMenuItems(items)
    {
        if (items.length > 0)
        {
            for (var i = 0; i < items.length; i++)
            {
                this.createMenuItem(items[i]);
            }
        }
    }

    /**
     * Create menu item
     *
     * @param object data
     * @return mixed
     */
    createMenuItem(data)
    {
        let container = $('._menus ul', this.container);
        let item = $('<li></li>')
            .addClass('_item')
            .attr('data-index', data.id)
            .append(
                $('<a></a>')
                    .attr('href', '#')
                    .append(
                        $('<div></div>')
                        .addClass('_image')
                        .append(
                            $('<img/>')
                                .attr('src', 'images/' + data.image)
                        )
                    )
                    .append(
                        $('<h3></h3>')
                        .addClass('_title')
                        .text(data.title)
                    )
                    .click((e) => {
                        this.slide.dir(data.id);
                    })
            )
            .appendTo(container);

        this.itemIndex++;
    }

    /**
     * Open/close menu
     *
     * @return mixed
     */
    menuAction()
    {
        $('._trigger', this.container).click((e) =>
        {
            this.container.addClass('_open');
            return false;
        });

        $('._menus ._close', this.container).click((e) =>
        {
            this.container.removeClass('_open');
            return false;
        });
    }
};

export default Menus;
