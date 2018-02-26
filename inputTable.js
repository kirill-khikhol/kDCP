
const app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope) {
    $scope.blowSeries = [];

    $scope.blowSeries.push({ rawBlow: 0, rawAtDepth: 280 });
    $scope.blowSeries.push({ rawBlow: 3, rawAtDepth: 430 });
    $scope.blowSeries.push({ rawBlow: 2, rawAtDepth: 550 });
    $scope.blowSeries.push({ rawBlow: 2, rawAtDepth: 750 });
    $scope.blowSeries.push({ rawBlow: 2, rawAtDepth: 860 });
    $scope.blowSeries.push({ rawBlow: 2, rawAtDepth: 960 });
    $scope.blowSeries.push({ rawBlow: 2, rawAtDepth: 1060 });
    $scope.blowSeries.push({ rawBlow: 2, rawAtDepth: 1160 });
    $scope.blowSeries.push({ rawBlow: 2, rawAtDepth: 1260 });

    if ($scope.blowSeries[$scope.blowSeries.length - 1].rawBlow || $scope.blowSeries[$scope.blowSeries.length - 1].rawAtDepth) {
        $scope.blowSeries.push({ rawBlow: "", rawAtDepth: "" });
    }
    $scope.blowSeries[0].blow = 0;
    $scope.blowSeries[0].atDepth = 0;
    $scope.count = 0;
    $scope.customSort = function () {
        var len = $scope.blowSeries.length;
        var buf;
        for (i = 1; i < len - 2; i++) {
            for (j = i + 1; j < len - 1; j++) {
                if ($scope.blowSeries[i].rawAtDepth > $scope.blowSeries[j].rawAtDepth) {
                    buf = $scope.blowSeries[i];
                    $scope.blowSeries[i] = $scope.blowSeries[j];
                    $scope.blowSeries[j] = buf;
                }
            }

        }
        $scope.refreshAll();
    }

    $scope.addRowFromBelow = function () {
        if (($scope.blowSeries.length == (this.$index + 1))) {
            $scope.blowSeries.push({ rawBlow: "", rawAtDepth: "" });
        }
    }
    $scope.removeRowFromBelow = function () {
        if (!($scope.blowSeries[this.$index].rawBlow || $scope.blowSeries[this.$index].rawAtDepth)) {
            $scope.blowSeries.pop(this.$index);
        }
        $scope.customSort();
    }
    $scope.refreshBlowBelow = function (index) {
        for (i = index; i < $scope.blowSeries.length - 1; i++) {
            $scope.blowSeries[i].blow = 0;
            for (j = 1; j <= i; j++) {
                $scope.blowSeries[i].blow += $scope.blowSeries[j].rawBlow;
            }
        }
    }
    $scope.refreshAtDepthBelow = function (index) {
        for (i = index; i < $scope.blowSeries.length - 1; i++) {
            $scope.blowSeries[i].atDepth =
                $scope.blowSeries[i].rawAtDepth - $scope.blowSeries[0].rawAtDepth;
        }
    }
    $scope.refreshAll = function (index) {
        if (index > 0) {
            $scope.refreshAtDepthBelow(index);
            $scope.refreshBlowBelow(index);
        } else {
            $scope.refreshAtDepthBelow(1);
            $scope.refreshBlowBelow(1);
        }
    }
    $scope.refresh = function () {
        $scope.refreshAll(this.$index);
    }
    $scope.refreshAll(1);
})