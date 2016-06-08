 jQuery(function($) {
    $.fn.clickableRow = function() {
        var self = this;
        self.click(function() {
            window.document.location = this.data('url');
        })
    }
})
