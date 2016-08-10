define(["./models/MoveTypeEnum", "./JsLogic"], function (MoveTypeEnum, GameLogic) {
    var gameLogic;

    return function () {
        var gameLogic = new GameLogic();
        debugger;
        var clearGameBlock = function () {
            var gameBlockControl = document.getElementById("game-block");

            while (gameBlockControl.firstChild) {
                gameBlockControl.removeChild(gameBlockControl.firstChild);
            }
        };

        var render = function (newMatrix) {

            clearGameBlock();

            var gameBlockControl = document.getElementById("game-block");

            for (var i = 0; i < newMatrix.length; ++i) {
                var divRow = document.createElement("div");
                divRow.className = "row";

                for (var j = 0; j < newMatrix[i].length; ++j) {
                    var div = document.createElement("div");
                    div.className = "col-md-3 well";

                    if (newMatrix[i][j].value !== 0) {
                        div.innerHTML = newMatrix[i][j].value;

                        switch (div.innerHTML.length) {
                            case 5:
                                div.className += " font-size-30"
                                break;
                            case 6:
                                div.className += " font-size-20"
                                break;
                        };

                    }
                    divRow.appendChild(div);
                }

                gameBlockControl.appendChild(divRow);
            }

            $("#scorediv")[0].innerHTML = gameLogic.getScore();
        };
        
        render(gameLogic.initMatrix());
        $("#gameRules").show();

        $(document).keydown(function (e) {

            var moveType;
            switch (e.which) {
                case 37: // left
                    moveType = MoveTypeEnum.Left;
                    break;

                case 38: // up
                    moveType = MoveTypeEnum.Up;
                    break;

                case 39: // right
                    moveType = MoveTypeEnum.Right;
                    break;

                case 40: // down
                    moveType = MoveTypeEnum.Down;
                    break;
            }
            if (moveType !== undefined) {
                render(gameLogic.getMovedMatrix(moveType));

                if (gameLogic.isOver()) {
                    debugger;
                    $("#game-block").addClass("div-opacity");
                    $("#loseMessage").show();

                }
                else if (gameLogic.isWin()) {
                    $("#game-block").addClass("div-opacity");
                    $("#winMessage").show();
                }
            }
        });

        $(document).click(function () {
            if ($("#loseMessage").is(':visible')) {
                $("#loseMessage").hide();
                $("#game-block").removeClass("div-opacity");
                render(gameLogic.initMatrix());
            }

            if ($("#winMessage").is(':visible')) {
                $("#game-block").removeClass("div-opacity");
                $("#winMessage").hide();
            }

            if ($("#gameRules").is(':visible'))
                $("#gameRules").hide();
        });

        $("#btnTryAgain").click(function () {
            render(gameLogic.initMatrix());
        });



    }

});