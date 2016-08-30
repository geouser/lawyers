// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
      

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body, html').css('overflow', 'hidden');
            } else {
                $('body, html').css('overflow', 'visible');
            }
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    $('.partners__slider').slick({
        dots: false,
        arrows: true,
        lazyLoad: 'ondemand',
        slidesToShow: 6,
        slidesToScroll: 1,

        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
    });

    /*---------------------------
                                  Specialists
    ---------------------------*/        
    $('.specialists__slider').slick({
        dots: false,
        arrows: true,
        lazyLoad: 'ondemand',
        slidesToShow: 5,
        slidesToScroll: 1,

        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
    });

    $('.specialists__slider__slide').click(function(){
        $('.specialists__slider__slide').removeClass('active');
        $(this).addClass('active');
        
        var target = $(this).attr('href');
        $('.specialistArtcile').removeClass('shown');
        $(target).toggleClass('shown');
    });




    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });


    /*----------------------------
                                    ACCARDION
        -------------------------*/
    if ( $('.faq-box').length > 0 ) {
        $('.faq-box').accordion({
            collapsible: true,
            heightStyle: "content"
        });    
    }

    /*---------------------------
                              INPUT ON FOCUS
    ---------------------------*/
    $('input, textarea').on('focusin', function(event) {
        event.preventDefault();
        $(this).parent().addClass('focus');
    });
    $('input, textarea').on('focusout', function(event) {
        event.preventDefault();
        if ( !$(this).val() ) {
            $(this).parent().removeClass('focus');
        }
    });




    /*---------------------------
                              GOOGLE MAPS
    ---------------------------*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');
        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);


        var mapOptions = {
            center: mapCenterCoord,
            zoom: 16,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Law"
        });

        var styles = [
          {
            stylers: [
              { lightness: -20 },
              { saturation: -60 }
            ]
          }
        ];
        map.setOptions({styles: styles});
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }
    if ( $('#map_canvas').length > 0) {
        googleMap_initialize();   
    }

}); // end file