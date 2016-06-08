 jQuery(function($) {
    $.fn.clickableRow = function() {
        this.click(function() {
            window.document.location = this.data('url');
        })
    }
})
