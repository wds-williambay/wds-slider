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
		sliderType,
	} = attributes;

	/**
	 * Images
	 */
	const imageIds = [];
	if (images) {
		images.map((image) => {
			imageIds.push(image.id);
		});
	}

	/**
	 * QueryBlock
	 */
	const allowedBlocksPostSliderType = ["core/query"];
	// const allowedBlocksPostSliderType = ["create-block/books-list"];
	// TODO Create Block variations on Query Block. Create own pattern with Swiper classes/elements applied.

	setAttributes({ navNext: `#slider-${blockId} .swiper-button-next` });
	setAttributes({ navPrev: `#slider-${blockId} .swiper-button-prev` });
	setAttributes({ paginationEl: `#slider-${blockId} .swiper-pagination` });

	const changeSlidesPerViewMobile = (slidesPerViewMobile) => {
		setAttributes({ slidesPerViewMobile });
	};

	const changeSlidesPerViewTablet = (slidesPerViewTablet) => {
		setAttributes({ slidesPerViewTablet });
	};

	const changeAutoPlayDelay = (autoPlayDelay) => {
		setAttributes({ autoPlayDelay });
	};

	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: clientId });
		}
	}, []);

	return (
		<Fragment {...useBlockProps()}>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label="Slider Type"
						value={sliderType}
						options={[
							{ label: "Images", value: "images" },
							{ label: "Blocks", value: "blocks" },
							{ label: "Posts", value: "posts" },
						]}
						onChange={(sliderType) => {
							{
								setAttributes(sliderType), console.log(sliderType);
								// TODO add conditionals for the different slider types.
							}
						}}
					/>
				</PanelBody>

				<PanelBody title={"Blabla"}>
					<ToggleControl
						label="Auto Play"
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
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<Toolbar>
					<MediaUploadCheck>
						<MediaUpload multiple={true} />
					</MediaUploadCheck>
				</Toolbar>
			</BlockControls>
			<swiper-container
				slides-per-view={slidesPerViewMobile}
				auto-play={autoPlayDelay}
				loop={loop}
				navigation={navigation}
				pagination={pagination}
				pagination-el={paginationEl}
				breakpoints-1024-slides-per-view={slidesPerViewTablet}
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
		</Fragment>
	);
}
