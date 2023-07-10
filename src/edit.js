import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import "./editor.scss";
import { register } from "swiper/element/bundle";
register();

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		blockId,
		slidesPerView,
		autoPlay,
		autoPlayDelay,
		loop,
		pagination,
		navigation,
	} = attributes;

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
		<div {...useBlockProps()}>
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
			<p>{__("Wds Slider – hello from the editor!", "wds-slider")}</p>
			<swiper-container
				slides-per-view={slidesPerView}
				auto-play={autoPlayDelay}
				loop={loop}
				navigation={navigation}
				pagination={pagination}
			>
				<swiper-slide>Slide 1</swiper-slide>
				<swiper-slide>Slide 2</swiper-slide>
				<swiper-slide>Slide 3</swiper-slide>
				<swiper-slide>Slide 4</swiper-slide>
				<swiper-slide>Slide 5</swiper-slide>
				<swiper-slide>Slide 6</swiper-slide>
			</swiper-container>
		</div>
	);
}
