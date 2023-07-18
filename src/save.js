import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save(props) {
	const { attributes } = props;
	const {
		blockId,
		images,
		effect,
		slideshowOrCarousel,
		slidesPerViewMobile,
		slidesPerViewTablet,
		loop,
		autoPlayDelay,
		transitionSpeed,
		paginationEl,
		navigation,
		navNext,
		navPrev,
		paginationStyle,
		thumbsFormat,
	} = attributes;
	return (
		<div {...useBlockProps.save()}>
			<swiper-container
				class="swiper-container"
				navigation={navigation}
				pagination-el={paginationEl}
				pagination-clickable="true"
				effect={effect}
				slides-per-view={slidesPerViewMobile}
				breakpoints-1024-slides-per-view={slidesPerViewTablet}
				auto-play={autoPlayDelay * 1000}
				speed={transitionSpeed * 1000}
				loop={loop}
				simulate-touch="true" //Only FALSE for admin. This allows the user to select the block.
				thumbs-swiper=".thumbs-nav"
				free-mode="true"
				watch-slides-progress="true"
			>
				{images &&
					images.map((image) => {
						return (
							<swiper-slide>
								<img src={image.url} />
							</swiper-slide>
						);
					})}
			</swiper-container>
			{/* <div
				className="swiper swiper-main"
				id={`slider-${blockId}`}
				data-effect={effect}
				data-slides-per-view={slidesPerViewMobile}
				data-slides-per-view-tablet={slidesPerViewTablet}
				data-swiper-autoplay={autoPlayDelay * 1000}
				data-transition-speed={transitionSpeed * 1000}
				data-loop={loop}
				data-nav-next={navNext}
				data-nav-prev={navPrev}
				data-pagination-el={paginationEl}
				data-thumbs-swiper="thumbs-nav"
				data-free-mode="true"
				data-watch-slides-progress="true"
			> */}
			{/* <InnerBlocks.Content /> */}
			{/* <div class="swiper-wrapper">
					{images &&
						images.map((image) => {
							return (
								<div class="swiper-slide">
									<img src={image.url} />
								</div>
							);
						})}
				</div> */}
			{/* {navigation && <div class="swiper-button-prev">P</div>}
				{navigation && <div class="swiper-button-next">N</div>} */}
			{/* {pagination && <div class="swiper-pagination"></div>} */}
			{/* </div> */}

			{/* {"thumbnails" === paginationStyle && (
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
			)} */}
		</div>
	);
}
