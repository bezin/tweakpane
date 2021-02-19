import {GettingStartedRoute} from './route/getting-started';
import {IndexRoute} from './route/index';
import {InputRoute} from './route/input';
import {MiscRoute} from './route/misc';
import {MonitorRoute} from './route/monitor';
import {QuickTourRoute} from './route/quick-tour';
import {ThemingRoute} from './route/theming';
import {UiComponentsRoute} from './route/ui-components';
import {Screw} from './screw';
import {SimpleRouter} from './simple-router';
import {SpMenu} from './sp-menu';

declare let hljs: any;

function setUpScrews() {
	const screwElems = document.querySelectorAll('.logo_symbol');
	screwElems.forEach((elem: Element) => {
		new Screw(elem as HTMLElement);
	});
}

function setUpSpMenu() {
	const buttonElem: HTMLElement | null = document.getElementById(
		'spMenuButton',
	);
	const menuElem: HTMLElement | null = document.querySelector('.menu');
	if (!buttonElem || !menuElem) {
		return;
	}

	new SpMenu({
		buttonElement: buttonElem,
		menuElement: menuElem,
	});
}

(() => {
	const router = new SimpleRouter();
	router.add(GettingStartedRoute);
	router.add(IndexRoute);
	router.add(InputRoute);
	router.add(MiscRoute);
	router.add(MonitorRoute);
	router.add(ThemingRoute);
	router.add(QuickTourRoute);
	router.add(UiComponentsRoute);
	router.route(location.pathname);

	setUpScrews();
	setUpSpMenu();

	hljs.initHighlightingOnLoad();
})();
