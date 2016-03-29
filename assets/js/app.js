
var baseurl = "http://localhost/timerly/";

var app = angular.module('timerly', [
	'ui.router',
	'angular-svg-round-progress',
	'mp.datePicker'
	]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('timer', {
      url: "/",
      controller: 'timer',
      templateUrl: baseurl + "partials/tpl-timer.html"
    })

    .state('activity', {
      url: "/activity",
      controller: 'activity',
      templateUrl: baseurl + "partials/tpl-activity.html"
    })
    .state('teams', {
      url: "/teams",
      controller: 'teams',
      templateUrl: baseurl + "partials/tpl-teams.html"
    })


    .state('projects', {
      url: "/projects",
      controller: 'projects',
      templateUrl: baseurl + "partials/tpl-projects.html"
    })

      .state('projectAdd', {
        url: "/project/add",
        controller: 'projects',
        templateUrl: baseurl + "partials/tpl-project-add.html"
      })
      
      .state('projectEdit', {
        url: "/project/edit",
        controller: 'projects',
        templateUrl: baseurl + "partials/tpl-project-edit.html"
      })




    .state('reports', {
      url: "/reports",
      controller: 'reports',
      templateUrl: baseurl + "partials/tpl-reports.html"
    });

});

app.controller('timer', function($scope){

});

app.controller('activity', function($scope){

});

app.controller('teams', function($scope){

});

app.controller('projects', function($scope){

});

app.controller('reports', function($scope){

});

