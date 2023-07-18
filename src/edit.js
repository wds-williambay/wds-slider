import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	Toolbar,
	InnerBlocks,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";

import { useEffect, useState, useRef } from "@wordpress/element";
import "./editor.scss";
import { Fragment } from "react";
import { register } from "swiper/element/bundle";
register();

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		blockId,
		images,
		sliderType,
		effect,
		slideshowOrCarousel,
		slidesPerViewMobile,
		slidesPerViewTablet,
		loop,
		autoPlay,
		autoPlayDelay,
		transitionSpeed,
		paginationEl,
		navigation,
		navNext,
		navPrev,
		paginationStyle,
		thumbsFormat,
	} = attributes;

	/**
	 *
	 *
	 * Images
	 *
	 *
	 */
	const imageIds = [];
	if (images) {
		images.map((image) => {
			imageIds.push(image.id);
		});
	}

	/**
	 *
	 *
	 * QueryBlock
	 *
	 *
	 */
	// const allowedBlocksPostSliderType = ["core/query"];
	// const allowedBlocksPostSliderType = ["create-block/books-list"];
	// TODO Create Block variations on Query Block. Create own pattern with Swiper classes/elements applied.

	/**
	 *
	 *
	 * Setting immutable attributes.
	 *
	 *
	 */
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: clientId });
		}
	}, []);
	setAttributes({ navNext: `#slider-${blockId} .swiper-button-next` });
	setAttributes({ navPrev: `#slider-${blockId} .swiper-button-prev` });
	setAttributes({ paginationEl: `#slider-${blockId} .swiper-pagination` });

	/**
	 *
	 *
	 * Functions to update attributes.
	 *
	 *
	 */

	/** General Options **/
	const changeSlideshowOrCarousel = (slideshowOrCarousel) => {
		setAttributes(slideshowOrCarousel);
	};

	/** Slideshow Options **/
	const changeEffect = (effect) => {
		setAttributes({ effect });
	};

	const changePaginationStyle = (paginationStyle) => {
		setAttributes({ paginationStyle });
	};

	/** Carousel Options **/

	const changeSliderType = (sliderType) => {
		console.log({ sliderType });
	};

	const changeSlidesPerViewMobile = (slidesPerViewMobile) => {
		setAttributes({ slidesPerViewMobile });
	};

	const changeSlidesPerViewTablet = (slidesPerViewTablet) => {
		setAttributes({ slidesPerViewTablet });
	};

	const changeAutoPlayDelay = (autoPlayDelay) => {
		setAttributes({ autoPlayDelay });
	};

	const changeTransitionSpeed = (transitionSpeed) => {
		setAttributes({ transitionSpeed });
	};

	/**
	 *
	 *
	 * Editor markup.
	 *
	 *
	 */
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label="Slideshow/Carousel"
						value={slideshowOrCarousel}
						help="Select Slideshow for single photos or slides. Select Carousel for multiple slides per view."
						options={[
							{ label: "Slideshow", value: "slideshow" },
							{ label: "Carousel", value: "carousel" },
						]}
						onChange={(slideshowOrCarousel) =>
							changeSlideshowOrCarousel(slideshowOrCarousel)
						}
					/>
					<ToggleControl
						label="Show Navigation Arrows"
						checked={navigation}
						onChange={() => setAttributes({ navigation: !navigation })}
					/>
				</PanelBody>

				{/* SLIDESHOW OPTIONS */}
				{/* {"slideshow" === slideshowOrCarousel && ( */}
				<PanelBody title="Slideshow Options" initialOpen="false">
					<SelectControl
						label="Transition Effect"
						value={effect}
						options={[
							{ label: "Slide", value: "slide" },
							{ label: "Fade", value: "fade" },
						]}
						onChange={(effect) => changeEffect(effect)}
					/>
					<SelectControl
						label="Pagination Style"
						value={paginationStyle}
						options={[
							{ label: "Bullets", value: "bullets" },
							{ label: "Numbers", value: "numbers" },
							{ label: "Thumbnails", value: "thumbnails" },
						]}
						onChange={(paginationStyle) =>
							changePaginationStyle(paginationStyle)
						}
					/>
					{"thumbnails" === paginationStyle && (
						<SelectControl
							label="Thumbnail Format"
							value={thumbsFormat}
							options={[
								{ label: "Square", value: "square-thumbs" },
								{ label: "Rectangle", value: "rect-thumbs" },
							]}
							onChange={(thumbsFormat) => setAttributes(thumbsFormat)}
						/>
					)}
				</PanelBody>
				{/* )} */}

				{/* Carousel Options */}
				{/* {"carousel" === slideshowOrCarousel && ( */}
				<PanelBody title="Carousel Options" initialOpen="false">
					<SelectControl
						label="Slide Type"
						value={sliderType}
						help="What do you want to display?"
						options={[
							{ label: "Images", value: "images" },
							{ label: "Blocks", value: "blocks" },
							{ label: "Posts", value: "posts" },
						]}
						// TODO add conditionals for the different slider types.
						onChange={(sliderType) => changeSliderType(sliderType)}
					/>
					<RangeControl
						label="Mobile Numbers"
						value={slidesPerViewMobile}
						onChange={(slidesPerViewMobile) =>
							changeSlidesPerViewMobile(slidesPerViewMobile)
						}
						min={1}
						max={6}
					/>
					<RangeControl
						label="TabletNumbers"
						value={slidesPerViewTablet}
						onChange={(slidesPerViewTablet) =>
							changeSlidesPerViewTablet(slidesPerViewTablet)
						}
						min={1}
						max={6}
					/>
				</PanelBody>
				{/* )} */}

				<PanelBody title="Timing Controls" initialOpen="false">
					<ToggleControl
						label="Loop Continuously"
						checked={loop}
						onChange={() => setAttributes({ loop: !loop })}
					/>
					<ToggleControl
						label="Auto Play"
						help="Disabled in Admin view."
						checked={autoPlay}
						onChange={() => setAttributes({ autoPlay: !autoPlay })}
					/>
					{autoPlay && (
						<RangeControl
							label="Slide Speed"
							help="Time slides are displayed (In milliseconds)."
							value={autoPlayDelay}
							onChange={(autoPlayDelay) => changeAutoPlayDelay(autoPlayDelay)}
							min={1.0}
							max={5.0}
							step={0.1}
						/>
					)}
					{autoPlay && (
						<RangeControl
							label="Slide Transition Speed"
							help="Time it takes to transition from one slide to the next (In milliseconds)."
							value={transitionSpeed}
							onChange={(transitionSpeed) =>
								changeTransitionSpeed(transitionSpeed)
							}
							min={0.1}
							max={2.0}
							step={0.1}
						/>
					)}
				</PanelBody>
				<PanelBody title="Needs A Home" initialOpen="false"></PanelBody>
			</InspectorControls>
			<BlockControls></BlockControls>
			<swiper-container
				class="swiper-container"
				slides-per-view={slidesPerViewMobile}
				auto-play={autoPlayDelay * 1000}
				speed={transitionSpeed * 1000}
				effect={effect}
				loop={loop}
				navigation={navigation}
				pagination-el={paginationEl}
				pagination-clickable="true"
				breakpoints-1024-slides-per-view={slidesPerViewTablet}
				simulate-touch="false" //Only FALSE for admin. This allows the user to select the block.
				thumbs-swiper=".thumbs-nav"
				free-mode="true"
				watch-slides-progress="true"
			>
				{images ? (
					images.map((image) => {
						return (
							<swiper-slide>
								<img src={image.url} />
							</swiper-slide>
						);
					})
				) : (
					<MediaPlaceholder
						multiple={true}
						icon="format-image"
						onSelect={(media) => setAttributes({ images: media })}
						onFilesPreUpload={(media) => setAttributes({ images: media })}
						onSelectURL={false}
						allowedTypes={["image"]}
						labels={{ title: "Add Images" }}
					/>
				)}
				{/* <InnerBlocks allowedBlocks={allowedBlocksPostSliderType} /> */}
			</swiper-container>
			{"thumbnails" === paginationStyle && (
				<swiper-container class="thumbs-nav" slides-per-view="10">
					{images
						? images.map((image) => {
								return (
									<swiper-slide>
										<img src={image.url} />
									</swiper-slide>
								);
						  })
						: ""}
				</swiper-container>
			)}
		</div>
	);
}
