import domReady from "@wordpress/dom-ready";

domReady(function () {
	const sliders = Array.from(document.querySelectorAll(".swiper"));

	sliders.map((slider) => {
		const sliderID = `#${slider.id}`;
		const slidesPerView = slider.dataset.slidesPerView;
		const autoPlay = slider.dataset.swiperAutoplay;
		const loop = slider.dataset.loop;

		const swiper = new Swiper(sliderID, {
			// Optional parameters
			slidesPerView: slidesPerView,
			loop: loop,
			autoplay: {
				delay: autoPlay,
			},
			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			// If we need pagination
			pagination: {
				el: ".swiper-pagination",
			},
		});
	});
});
