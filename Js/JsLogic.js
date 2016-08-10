
define(["./models/MoveTypeEnum", "./models/CellModel"], function (MoveTypeEnum, Cell) {
    return function () {

        //private var

        var size = 4;
        var score = 0;
        var matrix = [];
        var winScore = 2048;

        var MoveVecEnum = Object.freeze({
            Up: [0, 0, -1],
            Down: [size * size - 1, 0, 1],
            Right: [size * size - 1, 1, 0],
            Left: [0, -1, 0]
        });

        var isWin = false;
        var isOver = false;

        var searchForAvailableMoving = false;
        //private var end

        //public var


        //public var end
        //private methods

        function hasAvailableMoving() {
            searchForAvailableMoving = true;
            var hasAvailableMoving = moveMatrix(MoveVecEnum.Up) || moveMatrix(MoveVecEnum.Down) || moveMatrix(MoveVecEnum.Left) || moveMatrix(MoveVecEnum.Right);
            searchForAvailableMoving = false;

            return hasAvailableMoving;
        }

        function generateCellValue() {
            return Math.random() < 0.9 ? 2 : 4;
        }

        function getAvailableCells() {
            var arr = [];
            for (var i = 0; i < size; ++i) {
                for (var j = 0; j < size; ++j) {
                    if (matrix[i][j].value == 0)
                        arr.push([i, j]);
                }
            }
            debugger;
            return arr;
        }

        function genNewCellValue() {

            var index, i, j;
            debugger;
            var availableCells = getAvailableCells();
            if (availableCells.length > 0) {
                index = Math.floor(Math.random() * availableCells.length);
                var val = generateCellValue();
                i = availableCells[index][0];
                j = availableCells[index][1];
                matrix[i][j].value = val;
            }
        }

        function unmergeCells() {
            for (var i = 0; i < size; ++i) {
                for (var j = 0; j < size; ++j) {
                    matrix[i][j].merged = false;
                }
            }
        }

        function moveMatrix(vec) {
            var cellMoved = false;
            var curIndex = vec[0];
            var x = vec[1];
            var y = vec[2];

            for (var i = 0; i < size * size; i++) {
                var j = Math.abs(curIndex - i);

                var indexI = Math.floor(j / size);
                var indexJ = j % size;

                if (matrix[indexI][indexJ].value == 0)
                    continue;

                var nextI = indexI + y;
                var nextJ = indexJ + x;

                while (nextI >= 0 && nextI < size && nextJ >= 0 && nextJ < size) {

                    var nextVal = matrix[nextI][nextJ].value;
                    var currVal = matrix[indexI][indexJ].value;

                    var nextMerged = matrix[nextI][nextJ].merged;

                    if (nextVal == 0) {

                        if (searchForAvailableMoving)
                            return true;

                        matrix[nextI][nextJ].value = currVal;
                        matrix[indexI][indexJ].value = 0;
                        indexI = nextI;
                        indexJ = nextJ;
                        nextI += y;
                        nextJ += x;
                        cellMoved = true;

                    } else if (nextVal == currVal && !nextMerged) {

                        if (searchForAvailableMoving)
                            return true;

                        var value = currVal * 2;
                        score += value;
                        matrix[indexI][indexJ].value = 0;
                        matrix[nextI][nextJ].value = value;
                        matrix[nextI][nextJ].merged = true;
                        cellMoved = true;

                        if (!isWin && value == winScore)
                            isWin = true;

                        break;
                    } else
                        break;
                }
            }

            if (!searchForAvailableMoving) {
                if (cellMoved) {
                    unmergeCells();
                    genNewCellValue();
                }
                else if (!hasAvailableMoving()) {

                    isOver = true;
                }
            }

            return cellMoved;
        }

        //private methods end

        //protected methods

        this.getScore = function () {
            return score;
        }

        this.isWin = function () {
            return isWin;
        }

        this.isOver = function () {
            return isOver;
        }

        this.initMatrix = function () {
            debugger;
            isOver = false;
            isWin = false;
            score = 0;

            if (matrix.length > 0)
                matrix.length = 0;

            for (i = 0; i < size; i++)
                matrix.push([new Cell(0), new Cell(0), new Cell(0), new Cell(0)]);

            genNewCellValue();
            genNewCellValue();
            return matrix;
        }

        this.getMovedMatrix = function (moveType) {
            switch (moveType) {
                case MoveTypeEnum.Up:
                    moveMatrix(MoveVecEnum.Up);
                    break;
                case MoveTypeEnum.Down:
                    moveMatrix(MoveVecEnum.Down);
                    break;
                case MoveTypeEnum.Right:
                    moveMatrix(MoveVecEnum.Right);
                    break;
                case MoveTypeEnum.Left:
                    moveMatrix(MoveVecEnum.Left);
                    break;
            }
            return matrix;
        }

        //protected methods end

    };

});


