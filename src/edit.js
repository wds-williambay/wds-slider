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
		slideshowOrCarousel,
		slidesPerViewMobile,
		slidesPerViewTablet,
		autoPlay,
		autoPlayDelay,
		loop,
		pagination,
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
	const changeSlidesPerViewMobile = (slidesPerViewMobile) => {
		setAttributes({ slidesPerViewMobile });
	};

	const changeSlidesPerViewTablet = (slidesPerViewTablet) => {
		setAttributes({ slidesPerViewTablet });
	};

	const changePaginationStyle = (paginationStyle) => {
		setAttributes({ paginationStyle });
	};

	const changeAutoPlayDelay = (autoPlayDelay) => {
		setAttributes({ autoPlayDelay });
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
							setAttributes(slideshowOrCarousel)
						}
					/>
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
						onChange={(sliderType) => setAttributes(sliderType)}
					/>
				</PanelBody>

				<PanelBody title={"Blabla"}>
					<ToggleControl
						label="Auto Play"
						help="Disabled in Admin view."
						checked={autoPlay}
						onChange={() => setAttributes({ autoPlay: !autoPlay })}
					/>
					{autoPlay && (
						<RangeControl
							label="AutoPlay Time"
							value={autoPlayDelay}
							onChange={(autoPlayDelay) => changeAutoPlayDelay(autoPlayDelay)}
							min={1000}
							max={5000}
						/>
					)}

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
					<ToggleControl
						label="Loop Slideshow"
						checked={loop}
						onChange={() => setAttributes({ loop: !loop })}
					/>
					<ToggleControl
						label="Show Navigation Arrows"
						checked={navigation}
						onChange={() => setAttributes({ navigation: !navigation })}
					/>
					<ToggleControl
						label="Show Pagination"
						checked={pagination}
						onChange={() => setAttributes({ pagination: !pagination })}
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
			</InspectorControls>
			<BlockControls></BlockControls>
			<swiper-container
				class="swiper-container"
				slides-per-view={slidesPerViewMobile}
				auto-play={autoPlayDelay}
				loop={loop}
				navigation={navigation}
				pagination={pagination}
				pagination-el={paginationEl}
				pagination-clickable="true"
				breakpoints-1024-slides-per-view={slidesPerViewTablet}
				simulate-touch="false" //Only FALSE for admin. This allows the user to select the block.
				thumbs-swiper=".thumbs-nav"
				free-mode="true"
				watch-slides-progress="true"
				effect="fade"
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
