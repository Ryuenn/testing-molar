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
 * HTTP Basic, so there is no form, no session store and no page to style: the
 * browser puts up its own dialog and remembers the answer for the rest of the
 * tab. The trade is that there is no "log out" short of closing the browser,
 * which for a demo behind one password is the right trade.
 *
 * The password lives in `LIBRARY_PASSWORD`, a Netlify environment variable. If
 * it is unset the gate opens rather than locking everyone out of a page that is
 * meant to be shown — a deploy that forgets the variable should look broken to
 * the person who set it up, not to the client being walked through the site.
 *
 * `X-Robots-Tag: noindex` rides on the response too. A crawler that never gets
 * past the 401 would not index it anyway, but the header costs nothing and
 * covers the window between the variable being unset and someone noticing.
 */
import type { Config, Context } from '@netlify/edge-functions';

/** Shown in the browser's password dialog. */
const REALM = 'MOLAR video library';

export default async (request: Request, context: Context) => {
	const password = Netlify.env.get('LIBRARY_PASSWORD');

	/* Not configured — see the header. Serve the page rather than lock the site
	   against its own owner. */
	if (!password) return;

	const header = request.headers.get('authorization') ?? '';
	const [scheme, encoded] = header.split(' ');

	if (scheme === 'Basic' && encoded) {
		/* `atob` gives "user:pass"; the username is ignored, so anything the
		   visitor types there is fine. Split on the FIRST colon only — a password
		   containing one is legal and must not be truncated. */
		let decoded = '';
		try {
			decoded = atob(encoded);
		} catch {
			/* Malformed base64. Falls through to the challenge below. */
		}

		const supplied = decoded.slice(decoded.indexOf(':') + 1);
		if (decoded.includes(':') && timingSafeEqual(supplied, password)) {
			const response = await context.next();
			response.headers.set('X-Robots-Tag', 'noindex');
			return response;
		}
	}

	return new Response('Authentication required.', {
		status: 401,
		headers: {
			'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-store',
			'X-Robots-Tag': 'noindex',
		},
	});
};

/**
 * Constant-time compare, so the response time does not leak how much of the
 * password was right. Overkill for a shared demo password and still the correct
 * habit — a `===` here is the kind of thing that gets copied into the version
 * that guards something real.
 */
function timingSafeEqual(a: string, b: string): boolean {
	const encoder = new TextEncoder();
	const left = encoder.encode(a);
	const right = encoder.encode(b);

	/* Compare a fixed number of bytes whatever the lengths are, then fold the
	   length check into the same result. */
	let diff = left.length ^ right.length;
	for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
		diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
	}
	return diff === 0;
}

export const config: Config = {
	path: ['/resources/video-library', '/resources/video-library/*', '/de/resources/video-library', '/de/resources/video-library/*'],
};
