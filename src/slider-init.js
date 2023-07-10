import domReady from "@wordpress/dom-ready";

domReady(function () {
	const sliders = Array.from(document.querySelectorAll(".swiper"));

	sliders.map((slider) => {
		const sliderID = `#${slider.id}`;
		const slidesPerView = slider.dataset.slidesPerView;
		const autoPlay = slider.dataset.swiperAutoplay;
		const loop = slider.dataset.loop;
		const navNext = slider.dataset.navNext;
		const navPrev = slider.dataset.navPrev;
		const paginationEl = slider.dataset.paginationEl;

		const swiper = new Swiper(sliderID, {
			// Optional parameters
			slidesPerView: slidesPerView,
			loop: loop,
			autoplay: {
				delay: autoPlay,
			},
			// Navigation arrows
			navigation: {
				nextEl: navNext,
				prevEl: navPrev,
			},
			// If we need pagination
			pagination: {
				el: paginationEl,
				clickable: true,
			},
		});
	});
});
