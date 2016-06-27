(function($) {
    $.fn.sortTable = function(options) {

        var o = {
            sort: [],
            default: {
                index: 0,
                sort: 'asc'
            },
            icons: {
                asc  : 'glyphicon glyphicon-sort-by-attributes',
                desc : 'glyphicon glyphicon-sort-by-attributes-alt',
                none : 'glyphicon glyphicon-sort',
                color: '#909090'
            },
            tooltip: true,
            refreshCallback: function(_selector) {}
        };
        o = $.extend(o, options);

        var $selector = $(this);


        // Fonction qui va trier les données
        var sortDatas = function() {
            var $_this = $(this);

            $selector.find('span.sortTable-icons').removeClass(o.icons.asc + ' sortTable-active ' + o.icons.desc).addClass(o.icons.none);

            var $_span = $_this.find('span.sortTable-icons');

            if($_span.attr('data-sort') === 'asc') {
                $_span.addClass(o.icons.desc).addClass('sortTable-active').attr('data-sort', 'desc');
            } else {
                $_span.addClass(o.icons.asc).addClass('sortTable-active').attr('data-sort', 'asc');
            }

            refreshDatas();
        };

        var refreshDatas = function(callback) {
            var $active = $selector.find('span.sortTable-active');

            // On récupère la position de la colonne à tier
            var position = 0;
            $selector.find('th').each(function(index, th) {
                if($(th).find('span.sortTable-active').length === 1) {
                    position = index;
                }
            });

            // On récupère son ordre de trie
            var sortOrder = $active.attr('data-sort');

            var $tr = {};
            $selector.find('tbody').find('tr').each(function(index, tr) {
                var $td = $.trim($($(tr).find('td')[position]).text());

                if($tr[$td] !== undefined) {
                    $td = $td + ' ' + Math.random();
                }

                $tr[$td] = $(tr);
            });


            // On trie le tableau
            var keys = Object.keys($tr);
            var length = keys.length;

            keys.sort(function(a, b) {
                if($.isNumeric(a) && $.isNumeric(b)) {
                    return a - b;
                } else {
                    return a.localeCompare(b);
                }
            });
            if(sortOrder === 'desc') {
                keys.reverse();
            }

            var $tr_sort = [];
            for (var i = 0; i < length; i++) {
                var k = keys[i];
                $tr_sort.push($tr[k]);
            }


            $selector.find('tbody').html('');
            $.each($tr_sort, function(index, tr) {
                $selector.find('tbody').append(tr);
            });


            o.refreshCallback($selector);
            if(callback !== undefined) {
                callback($selector);
            }
        };






        $.each(o.sort, function(index, value) {
            var $span = (o.default.index === value) ? $("<span/>").addClass('sortTable-active').addClass((o.default.sort === 'asc') ? o.icons.asc : o.icons.desc).attr('data-sort', (o.default.sort === 'asc') ? 'asc' : 'desc') : $("<span/>").addClass(o.icons.none).attr('data-sort', 'none');

            $span.addClass('sortTable-icons pull-right').css({
                color: o.icons.color
            });

            $($selector.find('thead').find('th')[value]).css({
                cursor: 'pointer'
            }).append($span).on('click', sortDatas);

            if(o.tooltip) {
                $($selector.find('thead').find('th')[value]).html(
                    $("<div/>").attr('data-toggle', 'tooltip').attr('data-placement', 'top').attr('title', "Trier par : " + $.trim($($selector.find('thead').find('th')[value]).text())).html($($selector.find('thead').find('th')[value]).html())
                );
            }
        });

        refreshDatas();

        if(o.tooltip) {
            $('[data-toggle="tooltip"]').tooltip();
        }

        return {
            refresh: refreshDatas
        };
    };
})(jQuery);
