let slideDirective = function() {
    return {
        restrict: 'C',
        link: function (scope, element, attr) {
            element.bind('touchstart mousedown', function (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
            });
        }
    } 
};

angular.module('beer').directive('slide', slideDirective);