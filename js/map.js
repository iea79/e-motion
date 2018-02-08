ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
            center: [44.559342859742834,33.42270046610685],
            zoom: 10,
            controls: ['zoomControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),
        menu = $('<div class="map__right"></div>');
        
    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
    }

    function createMenuGroup (group) {
        var menuItem = $('<div class="map__list_title">' + group.name + '</div>'),
            collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
            submenu = $('<ul class="map__list"></ul>');

        myMap.geoObjects.add(collection);
        menu
            .append(menuItem)
            .append(submenu)
        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, submenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        var submenuItem = $('<li class="map__item"><a href="#" class="map__link">' + item.name + '</a></li>'),
            placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });
        collection.add(placemark);
        submenuItem
            .appendTo(submenu)
            .find('a')
            .bind('click', function () {
                if (!placemark.balloon.isOpen()) {
                    placemark.balloon.open();
                } else {
                    placemark.balloon.close();
                }
                return false;
            });
    }

    menu.appendTo($('.map__right_wrap'));
    myMap.behaviors.disable('scrollZoom');
    myMap.setBounds(myMap.geoObjects.getBounds());
}