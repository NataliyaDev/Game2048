define([], function () {

    return function (val, merged) {
        this.value = val;
        this.merged = merged == undefined ? false : merged;
    };


});