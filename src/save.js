import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save(props) {
	const { attributes } = props;
	const {
		blockId,
		images,
		slideshowOrCarousel,
		slidesPerViewMobile,
		slidesPerViewTablet,
		loop,
		autoPlayDelay,
		transitionSpeed,
		pagination,
		paginationEl,
		navigation,
		navNext,
		navPrev,
		paginationStyle,
		thumbsFormat,
	} = attributes;
	return (
		<div {...useBlockProps.save()}>
			<div
				className="swiper swiper-main"
				id={`slider-${blockId}`}
				data-slides-per-view={slidesPerViewMobile}
				data-slides-per-view-tablet={slidesPerViewTablet}
				data-swiper-autoplay={autoPlayDelay * 1000}
				data-transition-speed={transitionSpeed * 1000}
				data-loop={loop}
				data-nav-next={navNext}
				data-nav-prev={navPrev}
				data-pagination={pagination}
				data-pagination-el={paginationEl}
				data-thumbs-swiper="thumbs-nav"
				data-free-mode="true"
				data-watch-slides-progress="true"
				data-effect="fade"
			>
				{/* <InnerBlocks.Content /> */}
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
				{/* {pagination && <div class="swiper-pagination"></div>} */}
			</div>

			{"thumbnails" === paginationStyle && (
				<div
					thumbsSlider=""
					class="swiper thumbs-nav"
					id={`thumbs-nav-${blockId}`}
					data-slides-per-view="10"
				>
					<div class="swiper-wrapper">
						{images &&
							images.map((image) => {
								return (
									<div class={`swiper-slide ${thumbsFormat}`}>
										<img src={image.url} />
									</div>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
