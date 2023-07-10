import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	BlockControls,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
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
		slidesPerView,
		autoPlay,
		autoPlayDelay,
		loop,
		pagination,
		paginationEl,
		navigation,
		navNext,
		navPrev,
	} = attributes;

	/**
	 * Swiper configuration.
	 */
	const swiperRef = useRef(null);

	useEffect(() => {
		register();

		const params = {
			slidesPerView: slidesPerView,
			autoPlay: autoPlayDelay,
			loop: loop,
			navigation: navigation,
			pagination: {
				el: paginationEl,
			},
			//   breakpoints: {
			// 	768: {
			// 	  slidesPerView: 4,
			// 	},
			//   },
		};

		Object.assign(swiperRef.current, params);
		swiperRef.current.initialize();
	}, []);

	/**
	 * Images
	 */
	const imageIds = [];
	if (images) {
		images.map((image) => {
			imageIds.push(image.id);
		});
	}

	setAttributes({ navNext: `#slider-${blockId} .swiper-button-next` });
	setAttributes({ navPrev: `#slider-${blockId} .swiper-button-prev` });
	setAttributes({ paginationEl: `#slider-${blockId} .swiper-pagination` });

	const changeSlidesPerView = (slidesPerView) => {
		setAttributes({ slidesPerView });
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
						label="Numbers"
						value={slidesPerView}
						onChange={(slidesPerView) => changeSlidesPerView(slidesPerView)}
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
			<BlockControls></BlockControls>
			<p>{__("Wds Slider – hello from the editor!", "wds-slider")}</p>
			<swiper-container init="false" ref={swiperRef}>
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
			</swiper-container>
		</Fragment>
	);
}
