/**
 * The site's only always-on client script.
 *
 * Three jobs: Lenis smooth scroll, one orchestrated hero entrance, and
 * ScrollTrigger reveals for everything below the fold. Under
 * `prefers-reduced-motion: reduce` none of it loads — the module bails before
 * importing GSAP or Lenis at all, so reduced-motion visitors also get the
 * smaller payload.
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Strip the pre-paint hidden state so content is simply there. */
function revealInstantly(): void {
	document.documentElement.classList.remove('motion-ok');
	document
		.querySelectorAll<HTMLElement>('[data-reveal], [data-hero-in]')
		.forEach((el) => {
			el.style.opacity = '1';
			el.style.transform = 'none';
		});
}

/**
 * The nav is transparent over the hero and solid once past it. Kept here rather
 * than in Nav.astro so the placeholder nav can be replaced without losing it.
 */
function bindNavState(ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger): void {
	const nav = document.querySelector<HTMLElement>('[data-nav]');
	const hero = document.querySelector<HTMLElement>('[data-hero]');
	if (!nav || !hero || !nav.hasAttribute('data-nav-transparent')) return;

	ScrollTrigger.create({
		trigger: hero,
		start: 'bottom top+=80',
		onEnter: () => nav.removeAttribute('data-nav-transparent'),
		onLeaveBack: () => nav.setAttribute('data-nav-transparent', ''),
	});
}

async function init(): Promise<void> {
	if (REDUCED.matches) {
		revealInstantly();
		return;
	}

	const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
		import('lenis'),
		import('gsap'),
		import('gsap/ScrollTrigger'),
	]);

	gsap.registerPlugin(ScrollTrigger);

	// ── Smooth scroll ────────────────────────────────────────────────────────
	const lenis = new Lenis({
		duration: 1.05,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		// Touch keeps native momentum; hijacking it feels broken on iOS.
		syncTouch: false,
	});

	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time: number) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);

	// In-page anchors have to go through Lenis or they fight it.
	document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (event) => {
			const id = anchor.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector<HTMLElement>(id);
			if (!target) return;
			event.preventDefault();
			lenis.scrollTo(target, { offset: -88 });
			// Keep the URL and the focus ring honest for keyboard users.
			history.pushState(null, '', id);
			target.setAttribute('tabindex', '-1');
			target.focus({ preventScroll: true });
		});
	});

	// ── Hero: one staggered sequence, not five scattered ones ────────────────
	const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero-in]');
	if (heroItems.length) {
		gsap
			.timeline({ defaults: { ease: 'power3.out' } })
			.to(heroItems, {
				opacity: 1,
				y: 0,
				duration: 1,
				stagger: 0.09,
				delay: 0.15,
			})
			.fromTo(
				'[data-hero-scrim]',
				{ opacity: 0 },
				{ opacity: 1, duration: 1.2 },
				0,
			);
	}

	// ── Section reveals ──────────────────────────────────────────────────────
	gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
		// Grouped children animate as one stagger off the parent's trigger, so they
		// must not also get a trigger of their own. `hasAttribute`, not `dataset` —
		// `data-reveal-group` is a bare attribute and reads back as an empty string.
		if (el.hasAttribute('data-reveal-group')) return;

		gsap.to(el, {
			opacity: 1,
			y: 0,
			duration: 0.85,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: el,
				start: 'top 88%',
				once: true,
			},
		});
	});

	document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((container) => {
		const children = container.querySelectorAll<HTMLElement>('[data-reveal][data-reveal-group]');
		if (!children.length) return;

		gsap.to(children, {
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: 'power3.out',
			stagger: 0.08,
			scrollTrigger: {
				trigger: container,
				start: 'top 85%',
				once: true,
			},
		});
	});

	bindNavState(ScrollTrigger);

	// Late-arriving media (the hero poster, lazy images) changes layout height.
	window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });

	// Someone flipping the OS setting mid-session should get the quiet version.
	REDUCED.addEventListener('change', (event) => {
		if (!event.matches) return;
		lenis.destroy();
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		gsap.globalTimeline.clear();
		revealInstantly();
	});
}

/*
	If anything here fails — a chunk that never arrives, an engine that chokes on
	a plugin — the page must still be readable. The CSS hides reveal targets on
	the promise that this module will show them, so a rejection has to pay that
	promise back rather than leave a blank page behind.
*/
init().catch(() => revealInstantly());
