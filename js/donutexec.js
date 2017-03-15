'use strict';
angular.module('donutexec', [])
    .directive('donutexec', function () {
        return {
            restrict: 'E',
            controller: 'donutController',
            template: '<highchart id="chart1" config="chartExecutive">',
            scope: {
                donutparams: '='
            },
            link: function (scope, elem, attr, ctrl) {

            }
        } // end return

    })
    .controller('donutController', ['$scope', function ($scope) {
        //computing for the data
        //console.log('$scope.donutparams = ' + JSON.stringify($scope.donutparams));
        var percentage = ($scope.donutparams.totalTimeEstimateCompleteInMinutes / $scope.donutparams.totalTimeEstimateInMinutes) * 100
        var percentage = Math.round(percentage);
        var totaltimeHour = $scope.donutparams.totalTimeEstimate;
        var completetimeHour = $scope.donutparams.totalTimeEstimateComplete;        
        
        //the donut executive
        $scope.chartExecutive = {
                options: {
                    chart: {
                        type: 'solidgauge',
                        backgroundColor: 'transparent'
                    },
                    pane: {
                        center: ['50%', '50%'],
                        size: '91%',
                        startAngle: 0,
                        endAngle: 300,
                        background: {
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                            innerRadius: '135%',
                            outerRadius: '180%',
                            shape: 'circle'
                        }
                    },
                    solidgauge: {

                        dataLabels: {
                            borderWidth: 0,
                            useHTML: true
                        }
                    },
                    tooltip: {
                        enabled: true,
                        valueSuffix: '%',
                        positioner: function () {
                            return {
                                x: 0,
                                y: 0
                            };
                        }
                    },
                },


                series: [{
                    name: "LB time",
                    data: [{
                        radius: '110%',
                        innerRadius: '77%',/*how thick is the border of the circle*/
                        color: '#0085c3',
                        y: percentage // percentage to display
            }],
                    dataLabels: {
                        y: -40,
                        x: 0,
                        useHTML: true,
                        style: {
                            textShadow: false,
                            textOutline: false,
                            'font-family': 'Verdana, serif',
                        },
                        borderWidth: 0,
                        format: '<div class="donutexeccontainer"><div class="row">' + '<div class="logoexecchart"><i class="glyphicon glyphicon-time"></i></div>' + '<div class="row exinfomainchart"><span class="execinfochart">'+completetimeHour+' / '+totaltimeHour+'<span> <hr class="hrchartexec"></div>' + '<div class="row"><span class="execresdonut">{y}<small>%</small></span></div></div>'
                    },
                    showInLegend: false,
        }],
                title: {
                    text: '',
                    y: 50
                },
                yAxis: {
                    currentMin: 0,
                    currentMax: 100, // max because our max is 100%
                    lineWidth: 0,
                    tickPositions: []

                },
                size: {
                    height: 240,
                    width: 260


                },
                loading: false
            }
            //end the donut executive
    }])