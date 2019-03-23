$(document).ready(function() {

    // WOW
    new WOW().init(); 

    // Spinner
    hideSpinner();

    // Remove WOW delays on mobile
    removeDelays();

    // Top Button Revealing
    showTopButton();

    // ─────────────── //
    //     EXAMPLE     //
    // ─────────────── //

    // Selector
    $(document).on("click", "#example .option", function () {
        
        // We check if another animation is executing previously just to prevent it to stop
        if ($("#example .option-content").is(":animated"))
            return;

        // Variables
        var targetOption   = $(this).attr("data-target");
        var currentOption = $("#example .option.active").attr("data-target");
        var anchoSelector = $('#example .selector').width();

        // We do nothing if the user selects the same option
        if ( currentOption == targetOption )
            return;

        // Selected option updated
        $("#example .option.active").removeClass("active");
        $(this).addClass("active");

        // We move the indicator below the selected option
        if ( targetOption == "1" )
            $("#example .indicator").css('left', '1px');
        if ( targetOption == "2" )
            $("#example .indicator").css('left', (anchoSelector / 2) - 11);
        if ( targetOption == "3" )
            $("#example .indicator").css('left', (anchoSelector - 23 ));

        // We hide all the sentences
        $('#example .sentence').delay(5000).css('opacity', '0');

        // We hide the previous option content just to show the content belonging to the selected one
        if ( currentOption < targetOption ) {
            $("#example .option-content.active").animate(
                { opacity: "0", left: "-100px" },
                { duration: 500, queue: false, done: function () {
                    $("#example .option-content.active").css({"position" : "absolute", "left" : ""}).removeClass("active");
                    $("#example .option-content[data-content='" + targetOption + "']").css({"position" : "relative", "right" : "-100px"}).animate(
                        { opacity: "1", right: "0" },
                        { duration: 500, done: function () {
                            $("#example .option-content[data-content='" + targetOption + "']").css({"right" : ""}).addClass("active");
                            $('#example .sentence').delay(5000).css('opacity', '1');
                        }
                    });
                }
            });
        }
        else {
            $("#example .option-content.active").animate(
                { opacity: "0", right: "-100px" },
                { duration: 500, queue: false, done: function () {
                    $("#example .option-content.active").css({"position" : "absolute", "right" : ""}).removeClass("active");
                    $("#example .option-content[data-content='" + targetOption + "']").css({"position" : "relative", "left" : "-100px"}).animate(
                        { opacity: "1", left: "0" },
                        { duration: 500, done: function () {
                            $("#example .option-content[data-content='" + targetOption + "']").css({"left" : ""}).addClass("active");
                            $('#example .sentence').delay(5000).css('opacity', '1');
                        }
                    });
                }
            });
        }
    });

    // ──────────────────── //
    //     TESTIMONIALS     //
    // ──────────────────── //

    // Carousel
    $("#testimonials .navigation").click(function () {

        var pos   = $("#testimonials .testimonial-wrapper.active").attr("data-position");
        var total = $("#testimonials .testimonial-wrapper").length;

        $("#testimonials .testimonial-wrapper.active").css("opacity", "0");
        setTimeout(function () { $("#testimonials .testimonial-wrapper.active").removeClass("active") }, 1000);

        if ( $(this).hasClass("navigation-left") && ( pos == 1 ) )
            setTimeout(function () { $("#testimonials .testimonial-wrapper[data-position='" + total + "']").addClass("active"); }, 1000);
        else if ( $(this).hasClass("navigation-right") && ( pos == total ) )
            setTimeout(function () { $("#testimonials .testimonial-wrapper[data-position='1']").addClass("active"); }, 1000);
        else if ( $(this).hasClass("navigation-right") )
            setTimeout(function () { $("#testimonials .testimonial-wrapper[data-position='" + (++pos) + "']").addClass("active"); }, 1000);
        else
            setTimeout(function () { $("#testimonials .testimonial-wrapper[data-position='" + (--pos) + "']").addClass("active"); }, 1000);

        setTimeout(function () { $("#testimonials .testimonial-wrapper.active").css("opacity", "1"); }, 1500);
    })
});

// WOW Delays Removal on Mobile
function removeDelays() {
    if ($( window ).width() < 768)
        $('#reasons .card').removeAttr('style');
}

// Spinner hidding
function hideSpinner () {
    $("#preloader .rings").fadeOut(500, function () {
        $("#preloader").delay(500).fadeOut(500);
        setTimeout(function () { $("body").css("overflow", "visible"); }, 500);
    });
}

$(window).scroll(function() {
    showTopButton();
});

// Top Button Revealing
function showTopButton () {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
        $(".top-button").css("opacity", "1");
    else
        $(".top-button").css("opacity", "0");
}