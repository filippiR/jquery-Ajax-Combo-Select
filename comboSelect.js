(function ($) {
    var methods = {
        init: function (selector, options) {
            var settings = $.extend({
                urlSearch: '',
                empty: true,
                emptyText: 'Selecione',
                defaultSource: '',
                defaultDest: '',
            }, options);
            return this.each(function () {
                var $this = $(this),
                        data = $this.data('comboselect'),
                        destId = settings.selectDest;
                if (!data) {
                    $(this).data('comboselect', {
                        target: $this,
//                        comboselect: comboselect
                    });
                }

                $(this).change(function () {
                    if ($(this).val() != '' && $(this).val() != null && $(this).val() != settings.emptyText) {
                        $.ajax({
                            url: settings.urlSearch + '/' + $(this).val(),
                            async: true,
                            success: function (result) {
                                if (settings.empty) {
                                    result = '<option>' + settings.emptyText + '</option>' + result;
                                }
                                selector.html(result);
                                var selectDestId = '#' + selector.attr('id');
                                if ($(selectDestId + ' option').size() == 2) {
                                    $(selectDestId).val($(selectDestId + ' option:last').val());
                                } else if (settings.defaultDest != '') {
                                    selector.val(settings.defaultDest);
                                    settings.defaultDest = '';
                                }
                                selector.change();
                            }
                        });
                    } else {
                        var result = '<option>' + settings.emptyText + '</option>';
                        selector.html(result);
//                        $(this).change();
                        selector.change();
                    }
                });
                if (settings.defaultSource !== '') {
                    $(this).val(settings.defaultSource);
                    $(this).change();

                } else {
                    var selectOrigId = '#' + $(this).attr('id');
                    if ($(selectOrigId + ' option').size() == 2) {
                        $(this).val($(selectOrigId + ' option:last').val());
                        $(this).change();
                    }
                }
            });
        },
        destroy: function ( ) {

            return this.each(function () {

                var $this = $(this),
                        data = $this.data('comboselect');

                // Namespacing FTW
                $(window).unbind('.comboselect');
                data.comboselect.remove();
                $this.removeData('comboselect');

            })

        },
        setarCombo: function (selectOrigin, selectDest, urlFind) {
            $(selectOrigin).change(function () {
                if ($(selectOrigin).val() != '' && $(selectOrigin).val() != null) {
                    $.ajax({
                        url: urlFind + '/' + $(selectOrigin).val(),
                        success: function (options) {
                            if (this.empty) {
                                options = '<option>' + this.emptyText + '</option>' + options;
                            }
                            $(selectDest).html(options);

                            if ($(selectDest + ' option').size() == 2) {
                                $(selectDest).val($(selectDest + ' option:last').val());
                            } else if (this.defaultDest != '') {
                                $(selectDest).val(this.defaultDest);
                                this.defaultDest = '';
                                $(selectDest).change();
                            }
                        }
                    });
                } else {
                    var options = options = '<option>' + this.emptyText + '</option>';
                    $(selectDest).html(options);
                }
            });
            $(selectOrigin).change();
        },
        reposition: function ( ) { },
        show: function () { },
        hide: function () { },
        update: function (content) { }
    };
    $.fn.comboselect = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.comboselect');
        }

    };

})(jQuery);

