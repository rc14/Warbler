!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){window.initWarbler=function(){var b=a("./gmap/gmap.directive"),c=a("./search/warblerSearch.directive"),d=a("./main.controller"),e=(a("./gmap/gmap.controller"),a("./model.service")),f=angular.module("warbler",["ngResource"]);f.service("warbler_model_service",["$resource","$rootScope",e]),f.directive("gmap",[b]).directive("warblerSearch",[c]),f.controller("warbler_main_controller",["$scope",d]),angular.bootstrap(document,["warbler"]),$("#menu-toggle").click(function(a){a.preventDefault(),$("#sidebar-wrapper").toggleClass("toggled"),$(this).find("i").toggleClass("fa-bars fa-ellipsis-v")}),$(window).resize(function(){var a=$(window).height()-$(".navbar").height();$("#gmap").css("height",a),$("#gmap").css("margin-top",$(".navbar").height())}).resize()}},{"./gmap/gmap.controller":2,"./gmap/gmap.directive":3,"./main.controller":4,"./model.service":5,"./search/warblerSearch.directive":6}],2:[function(a,b,c){b.exports=function(a,b){function c(a){angular.forEach(a,function(a,b){a.setMap(null)})}function d(a,b,c,d,e,f){var g=new google.maps.Marker({map:a,draggable:!1,title:"source: Twitter",animation:google.maps.Animation.DROP,position:{lat:c,lng:d},icon:e}),h=new google.maps.InfoWindow({content:'<span style="color: #000;">'+f+"</span>"});return g.addListener("click",function(){h.open(a,g)}),g}function e(b,c,e,f){var g=[];angular.forEach(c,function(c,h){if(!c.GeoLocation)return!1;var i=c.GeoLocation[0],j=c.GeoLocation[1],k=c.Message+"<br /><br />"+c.Timestamp,l=d(a.map,"source: Twitter",i,j,e,k);l.setVisible(f),b.push(l);var m=new google.maps.LatLng(i,j);g.push(m)})}a.map=null,a.markers={};var f=function(b){angular.forEach(b,function(b,c){a.markers[b.topic]=[],b.control={hide:function(){angular.forEach(a.markers[b.topic],function(a,b){a.setVisible(!1)})},show:function(){angular.forEach(a.markers[b.topic],function(a,b){a.setVisible(!0)})}}})},g=function(d){angular.forEach(d,function(d,f){a.$on("model."+d.topic+".updated",function(){c(a.markers[d.topic]),e(a.markers[d.topic],b[d.topic],d["marker-icon"],d.selected)}),a.$on("model."+d.topic+".added",function(b,c){e(a.markers[d.topic],c,d["marker-icon"],d.selected)})})};b.categories.$promise.then(function(a){angular.forEach(b.categories,function(a,b){f(a.topics),g(a.topics)})},function(b){a.error=b.data.message||b.data.error||b.message||b.error||b})}},{}],3:[function(a,b,c){b.exports=function(b){var c=a("./gmap.controller"),d={};return{scope:{},link:function(a,b,c){a.map=new google.maps.Map(b[0],d);var e=new google.maps.Geocoder;e.geocode({address:"US"},function(b,c){b[0].geometry.viewport.getNorthEast(),b[0].geometry.viewport.getSouthWest();a.map.fitBounds(b[0].geometry.viewport)})},controller:["$scope","warbler_model_service",c]}}},{"./gmap.controller":2}],4:[function(a,b,c){b.exports=function(a){console.log("init main_controller")}},{}],5:[function(a,b,c){b.exports=function(a,b){var c=new Firebase("https://blistering-inferno-5589.firebaseio.com"),d={categories:a("search/categories.json").query()},e={TweetEarthquake:c.child("TweetEarthquake"),TweetTraffic:c.child("TweetTraffic"),TweetHillaryClinton:c.child("TweetHillaryClinton"),TweetBernieSanders:c.child("TweetBernieSanders"),TweetDonaldTrump:c.child("TweetDonaldTrump")};angular.forEach(e,function(a,b){a.orderByChild("Timestamp").limitToLast(1e3)});var f=function(){angular.forEach(d.categories,function(a,c){angular.forEach(a.topics,function(a,c){d.hasOwnProperty(a.topic)||(d[a.topic]={}),e[a.topic].once("value",function(c){angular.extend(d[a.topic],c.val()),b.$broadcast("model."+a.topic+".updated")}),e[a.topic].on("child_added",function(c,e){angular.extend(d[a.topic],c.val()),b.$broadcast("model."+a.topic+".added",new Array(c.val()))})})})};return d.categories.$promise.then(function(a){f()},function(a){}),d}},{}],6:[function(a,b,c){b.exports=function(){var a=function(a,b){a.categories=b.categories,a.toggleTopic=function(a){a.selected=!a.selected,a.selected?a.control.show():a.control.hide()},console.log("init warblerSearch")};return{templateUrl:"search/warblerSearch.template.html",link:function(a,b,c){},controller:["$scope","warbler_model_service",a]}}},{}]},{},[1]);