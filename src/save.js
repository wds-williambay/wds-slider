import { useBlockProps } from "@wordpress/block-editor";

export default function save(props) {
	const { attributes } = props;
	const {
		blockId,
		images,
		slidesPerView,
		autoPlayDelay,
		loop,
		pagination,
		paginationEl,
		navigation,
		navNext,
		navPrev,
	} = attributes;
	return (
		<div {...useBlockProps.save()}>
			{console.log(paginationEl)}
			<p>{"Wds Slider – hello from the saved content!"}</p>
			<div
				className="swiper"
				id={`slider-${blockId}`}
				data-slides-per-view={slidesPerView}
				data-swiper-autoplay={autoPlayDelay}
				data-loop={loop}
				data-nav-next={navNext}
				data-nav-prev={navPrev}
				data-pagination-el={paginationEl}
			>
				<div class="swiper-wrapper">
					{images &&
						images.map((image) => {
							return (
								<div class="swiper-slide">
									<img src={image.url} />
								</div>
							);
						})}
				</div>
				{navigation && <div class="swiper-button-prev">P</div>}
				{navigation && <div class="swiper-button-next">N</div>}
				{pagination && <div class="swiper-pagination"></div>}
			</div>
		</div>
	);
}
