require.config({
    baseUrl: "Js/utils",
    paths: {
        jquery: 'jquery-3.1.0.min',
        bootstrap: 'bootstrap.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});

requirejs(['jquery', '../JsGameController'],
function ($, GameController) {
    $(function() {
        GameController();
    });        
});