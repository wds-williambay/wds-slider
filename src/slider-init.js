import domReady from "@wordpress/dom-ready";

domReady(function () {
	const sliderBlocks = Array.from(
		document.querySelectorAll(".wp-block-create-block-wds-slider")
	);

	sliderBlocks.map((sliderBlock) => {
		const slider = sliderBlock.querySelector(".swiper-main");
		const sliderID = `#${slider.id}`;
		const effect = slider.dataset.effect;
		const slidesPerViewMobile = slider.dataset.slidesPerView;
		const slidesPerViewTablet = slider.dataset.slidesPerViewTablet;
		const loop = slider.dataset.loop;
		const autoPlay = slider.dataset.swiperAutoplay;
		const transitionSpeed = slider.dataset.transitionSpeed;
		const navNext = slider.dataset.navNext;
		const navPrev = slider.dataset.navPrev;
		const paginationEl = slider.dataset.paginationEl;
		// const paginationStyle = slider.dataset.paginationStyle;

		const swiper = new Swiper(sliderID, {
			// Optional parameters
			slidesPerView: slidesPerViewMobile,
			breakpoints: {
				1024: {
					slidesPerView: slidesPerViewTablet,
				},
			},
			effect: effect,
			loop: loop,
			autoplay: {
				delay: autoPlay,
			},
			speed: transitionSpeed,
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
			freeMode: true,
			watchSlidesProgress: true,
		});

		const thumbs = sliderBlock.querySelector(".thumbs-nav");

		const thumbSlider = new Swiper(thumbs, {
			slidesPerView: "10",
			thumbs: {
				swiper: swiper,
			},
		});
	});
});
