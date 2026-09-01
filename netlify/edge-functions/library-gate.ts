/**
 * Password gate for the video library.
 *
 *   /resources/video-library/    and    /de/resources/video-library/
 *
 * One shared password for everyone — this is a lock on a page, not a login. It
 * keeps the catalogue off the open web while the real Client Portal is being
 * decided; it does not know who a visitor is and cannot tell one practice from
 * another. Anything that needs per-practice access has to wait for that build.
 *
 * This used to be HTTP Basic, which meant the browser's own grey dialog in
 * front of a page a client is being walked through. It is a form now, styled to
 * the site, which costs one cookie:
 *
 *   GET   no cookie          → the form
 *   POST  password correct   → set cookie, 303 back to the page
 *   POST  password wrong     → the form again, with an error and a 401
 *   GET   cookie valid       → the page
 *
 * The cookie carries an expiry and an HMAC of it, keyed on the password itself.
 * That is what stops it being forged — without the key you cannot produce a
 * signature the check accepts — and it also means changing `LIBRARY_PASSWORD`
 * invalidates every cookie already issued, which is exactly what you want from
 * a password change.
 *
 * The password lives in `LIBRARY_PASSWORD`, a Netlify environment variable. If
 * it is unset the gate opens rather than locking everyone out of a page that is
 * meant to be shown — a deploy that forgets the variable should look broken to
 * the person who set it up, not to the client being walked through the site.
 */
import type { Config, Context } from '@netlify/edge-functions';

const COOKIE = 'molar_library';

/** A week. Long enough that a client is not re-prompted mid-review. */
const MAX_AGE = 60 * 60 * 24 * 7;

export default async (request: Request, context: Context) => {
	const password = Netlify.env.get('LIBRARY_PASSWORD');

	/* Not configured — see the header. Serve the page rather than lock the site
	   against its own owner. */
	if (!password) return;

	const url = new URL(request.url);

	if (request.method === 'POST') {
		const form = await request.formData();
		const supplied = String(form.get('password') ?? '');

		if (!timingSafeEqual(supplied, password)) {
			return page(url.pathname, true);
		}

		/* 303 rather than 302: the redirect after a POST must be followed as a
		   GET, or the browser re-submits the form at the destination. */
		return new Response(null, {
			status: 303,
			headers: {
				Location: url.pathname,
				'Set-Cookie': `${COOKIE}=${await mint(password)}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
				'Cache-Control': 'no-store',
			},
		});
	}

	const token = readCookie(request.headers.get('cookie'), COOKIE);
	if (token && (await verify(token, password))) {
		const response = await context.next();
		/* The page itself must never be cached at the edge or in a shared proxy —
		   it is behind a gate, and a cached copy would be served to someone who
		   never passed it. */
		response.headers.set('Cache-Control', 'private, no-store');
		response.headers.set('X-Robots-Tag', 'noindex');
		return response;
	}

	return page(url.pathname, false);
};

/* ── The cookie ──────────────────────────────────────────────────────────────
   `<expiry>.<hmac(expiry)>`, keyed on the password. Both halves are checked:
   the signature proves we issued it, the expiry proves it is still current. A
   signature alone would be a bearer token that never dies.
   ────────────────────────────────────────────────────────────────────────── */

async function key(password: string): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign'],
	);
}

async function sign(value: string, password: string): Promise<string> {
	const mac = await crypto.subtle.sign('HMAC', await key(password), new TextEncoder().encode(value));
	return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function mint(password: string): Promise<string> {
	const expiry = String(Date.now() + MAX_AGE * 1000);
	return `${expiry}.${await sign(expiry, password)}`;
}

async function verify(token: string, password: string): Promise<boolean> {
	const [expiry, mac] = token.split('.');
	if (!expiry || !mac) return false;
	if (!/^\d+$/.test(expiry) || Number(expiry) < Date.now()) return false;
	return timingSafeEqual(mac, await sign(expiry, password));
}

function readCookie(header: string | null, name: string): string | null {
	if (!header) return null;
	for (const part of header.split(';')) {
		const [k, ...rest] = part.trim().split('=');
		if (k === name) return rest.join('=');
	}
	return null;
}

/**
 * Constant-time compare, so the response time does not leak how much of the
 * password was right.
 */
function timingSafeEqual(a: string, b: string): boolean {
	const encoder = new TextEncoder();
	const left = encoder.encode(a);
	const right = encoder.encode(b);

	let diff = left.length ^ right.length;
	for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
		diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
	}
	return diff === 0;
}

/* ── The form ────────────────────────────────────────────────────────────────
   Standalone HTML with its own styles. It cannot reach for the site's
   stylesheet: that is a content-hashed file whose name changes every build, and
   an edge function has no way to know this build's name. The tokens below are
   copied from `src/styles/global.css` — few enough to keep in step by hand, and
   the alternative is a gate that breaks whenever the bundle is rebuilt.
   ────────────────────────────────────────────────────────────────────────── */

function page(action: string, failed: boolean): Response {
	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Video library — MOLAR</title>
<style>
	:root {
		--ink-950: #05070d;
		--ink-900: #070b14;
		--ink-800: #0e1628;
		--bone-50: #eef3fb;
		--bone-300: #a8b7cf;
		--bone-400: #8494b0;
		--arc-300: #78b0ff;
		--arc-500: #0a66ff;
		--arc-600: #0a51cc;
		--line: rgba(122, 162, 216, 0.16);
		--sans: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
		--mono: ui-monospace, 'Cascadia Code', 'SFMono-Regular', monospace;
	}
	* { box-sizing: border-box; }
	body {
		margin: 0;
		min-height: 100dvh;
		display: grid;
		place-items: center;
		padding: 1.5rem;
		background-color: var(--ink-950);
		background-image: radial-gradient(
			148% 108% at 100% 0%,
			rgba(10, 102, 255, 0.3) 0%,
			rgba(30, 58, 138, 0.34) 18%,
			rgba(14, 26, 47, 0.82) 42%,
			rgba(8, 13, 23, 0.94) 66%,
			var(--ink-950) 100%
		);
		background-attachment: fixed;
		font-family: var(--sans);
		color: var(--bone-300);
		-webkit-font-smoothing: antialiased;
	}
	main {
		width: min(26rem, 100%);
		padding: clamp(1.75rem, 5vw, 2.5rem);
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: rgba(7, 11, 20, 0.86);
		box-shadow: 0 40px 90px -50px #000;
	}
	.eyebrow {
		margin: 0 0 0.85rem;
		font-family: var(--mono);
		font-size: 0.6875rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--arc-300);
	}
	h1 {
		margin: 0 0 0.6rem;
		font-size: 1.5rem;
		line-height: 1.15;
		letter-spacing: -0.02em;
		font-weight: 600;
		color: var(--bone-50);
	}
	p.lede { margin: 0 0 1.6rem; font-size: 0.9375rem; line-height: 1.55; }
	label {
		display: block;
		margin-bottom: 0.45rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--bone-50);
	}
	input {
		width: 100%;
		min-height: 3rem;
		padding: 0 0.9rem;
		border: 1px solid var(--line);
		border-radius: 0.625rem;
		background: var(--ink-800);
		font: inherit;
		font-size: 1rem;
		color: var(--bone-50);
	}
	input:focus-visible {
		outline: 2px solid var(--arc-500);
		outline-offset: 2px;
		border-color: transparent;
	}
	button {
		width: 100%;
		min-height: 3rem;
		margin-top: 1rem;
		border: 0;
		border-radius: 0.625rem;
		background: var(--bone-50);
		font: inherit;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--ink-950);
		cursor: pointer;
		transition: background-color 0.2s;
	}
	button:hover { background: #fff; }
	.error {
		margin: 0 0 1.1rem;
		padding: 0.7rem 0.85rem;
		border: 1px solid rgba(255, 120, 120, 0.4);
		border-radius: 0.5rem;
		background: rgba(120, 20, 20, 0.24);
		font-size: 0.875rem;
		color: #ffd7d7;
	}
	.foot {
		margin: 1.5rem 0 0;
		font-size: 0.8125rem;
		color: var(--bone-400);
	}
	.foot a { color: var(--arc-300); }
</style>
</head>
<body>
	<main>
		<p class="eyebrow">Video library</p>
		<h1>This page is private.</h1>
		<p class="lede">Enter the access password to view the patient education catalogue.</p>
		${failed ? '<p class="error" role="alert">That password is not right. Try again.</p>' : ''}
		<form method="post" action="${escape(action)}">
			<label for="password">Password</label>
			<input id="password" name="password" type="password" autocomplete="current-password" autofocus required>
			<button type="submit">View the library</button>
		</form>
		<p class="foot">Don't have it? <a href="/pricing/">See the plans</a>.</p>
	</main>
</body>
</html>`;

	return new Response(html, {
		/* 401 on a failed attempt so it is not logged as a success; 200 on the
		   first sight of the form, which is not a failure — nobody has tried
		   anything yet. */
		status: failed ? 401 : 200,
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'no-store',
			'X-Robots-Tag': 'noindex',
		},
	});
}

/** The form's action is a URL path off the request; escape it anyway. */
function escape(value: string): string {
	return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const config: Config = {
	path: ['/resources/video-library', '/resources/video-library/*', '/de/resources/video-library', '/de/resources/video-library/*'],
};
