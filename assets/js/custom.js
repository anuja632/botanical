$(document).ready(function () {
    if ($('.product-one__carousel').length) {
        $('.product-one__carousel').owlCarousel({
            items: 4,
            margin: 30,
            loop: true,
            smartSpeed: 700,
            nav: false,
            dots: true,
            autoplay: false,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
    }
});
