define(['jquery', 'durandal/app', 'durandal/system', 'knockout'], function($, app, system, ko)
{
    

    return {
        
        activate: function() {
        	system.log('Lifecycle : activate : hello');
	        

        	

        },
        binding: function () {
            system.log('Lifecycle : binding : hello');
            return { cacheViews:false }; //cancels view caching for this module, allowing the triggering of the detached callback
        },
        bindingComplete: function () {
            system.log('Lifecycle : bindingComplete : hello');
        },
        attached: function (view, parent) {
            system.log('Lifecycle : attached : hello');
        },
        compositionComplete: function (view) {
        	system.log('Lifecycle : compositionComplete : hello');
	        

        	var api;
        	$(document).ready(function()
        	{
        		api = $('.banner').revolution(
                               {
                               	delay: 7000,

                               	startheight: 300,

                               	hideThumbs: 300,

                               	navigationType: "none",					//bullet, thumb, none, both		(No Thumbs In FullWidth Version !)
                               	navigationArrows: "verticalcentered",		//nexttobullets, verticalcentered, none
                               	navigationStyle: "round",				//round,square,navbar

                               	touchenabled: "on",						// Enable Swipe Function : on/off
                               	onHoverStop: "on",						// Stop Banner Timet at Hover on Slide on/off

                               	navOffsetHorizontal: 0,
                               	navOffsetVertical: 20,

                               	stopAtSlide: -1,
                               	stopAfterLoops: -1,

                               	shadow: 0,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
                               	fullWidth: "on"							// Turns On or Off the Fullwidth Image Centering in FullWidth Modus
                               });
        	});


        	/* carousel Slider Js */

        	$('.img-gal .carousel').carousel({
        		interval: 5000
        	});

        	$('.testimonial .carousel').carousel({
        		interval: 9000
        	});

        	console.log('xx');
        	console.log($('.img-gal .carousel'));



        },
        detached: function (view) {
            system.log('Lifecycle : detached : hello');
        }
    };
});