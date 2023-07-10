import { useBlockProps } from "@wordpress/block-editor";

export default function save(props) {
	const { attributes } = props;
	const {
		blockId,
		slidesPerView,
		autoPlayDelay,
		loop,
		pagination,
		navigation,
	} = attributes;
	return (
		<div {...useBlockProps.save()}>
			<p>{"Wds Slider – hello from the saved content!"}</p>
			<div
				className="swiper"
				id={`slider-${blockId}`}
				data-slides-per-view={slidesPerView}
				data-swiper-autoplay={autoPlayDelay}
				data-loop={loop}
				data-cssMode="true"
			>
				<div class="swiper-wrapper">
					<div class="swiper-slide">Slide 1</div>
					<div class="swiper-slide">Slide 2</div>
					<div class="swiper-slide">Slide 3</div>
					<div class="swiper-slide">Slide 4</div>
					<div class="swiper-slide">Slide 5</div>
					<div class="swiper-slide">Slide 6</div>
				</div>
				{navigation && <div class="swiper-button-next">N</div>}
				{navigation && <div class="swiper-button-prev">P</div>}
				{pagination && <div class="swiper-pagination"></div>}
			</div>
		</div>
	);
}
