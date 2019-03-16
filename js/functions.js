$(document).ready(function() {

    // WOW
    new WOW().init(); 

    // ──────────────── //
    //     TRAINING     //
    // ──────────────── //

    // Timeline
    $(document).on("click", "#example .year", function () {
        
        // We check if another timeline animation is executing previously just to prevent it to stop
        if ($("#example .indicator").is(":animated") || $("#example .year-content").is(":animated"))
            return;

        var targetYear  = $(this).attr("data-year");
        var currentYear = $("#example .year.active").attr("data-year");

        // We do nothing if the user selects the same year
        if ( currentYear == targetYear )
            return;

        // Selected year updated
        $("#example .year.active").removeClass("active");
        $(this).addClass("active");

        // We move the indicator below the selected year
        var position = $(this).position();
        $("#example .indicator").animate({
            left: position.left - 20
        }, { duration: 500, queue: false });

        // We hide the previous year content just to show the one belonging to the selected year
        if ( currentYear < targetYear ) {
            $("#example .year-content.active").animate(
                { opacity: "0", left: "-100px" },
                { duration: 500, queue: false, done: function () {
                    $("#example .year-content.active").css({"position" : "absolute", "left" : ""}).removeClass("active");
                    $("#example .year-content[data-content='" + targetYear + "']").css({"position" : "relative", "right" : "-100px"}).animate(
                        { opacity: "1", right: "0" },
                        { duration: 500, done: function () {
                            $("#example .year-content[data-content='" + targetYear + "']").css({"right" : ""}).addClass("active")
                        }
                    });
                }
            });
        }
        else {
            $("#example .year-content.active").animate(
                { opacity: "0", right: "-100px" },
                { duration: 500, queue: false, done: function () {
                    $("#example .year-content.active").css({"position" : "absolute", "right" : ""}).removeClass("active");
                    $("#example .year-content[data-content='" + targetYear + "']").css({"position" : "relative", "left" : "-100px"}).animate(
                        { opacity: "1", left: "0" },
                        { duration: 500, done: function () {
                            $("#example .year-content[data-content='" + targetYear + "']").css({"left" : ""}).addClass("active")
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