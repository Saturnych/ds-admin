import { expect, test } from '@playwright/test';

const getCookieValue = (cookie: string) => {
	return cookie.split(';')[0].trim();
};

const getCookieMaxage = (cookie: string) => {
	return cookie.split(';')[1].trim().replace('Max-Age=', '');
};

test('Homepage has "Dashboard" title and Sign-In', async ({ page, request, context }) => {
	await context.clearCookies();

	await page.goto('/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle('Dashboard');

	// create a locator
	const getStarted = page.getByText('Sign In');

	// Expect an attribute "to be strictly equal" to the value.
	await expect(getStarted).toHaveAttribute('href', '/auth');

	// // Click the get started link.
	await getStarted.click();

	// // Expects the URL to contain intro.
	// await expect(page).toHaveURL(/.*intro/);
});

/*

test('[FEAT]: Setting the session', async ({ page, request, context }) => {
	await context.clearCookies();

	await page.goto('/tests/set-session');
	expect(await page.textContent('#views')).toBe('42');
	expect(await page.textContent('#session-store-views')).toBe('undefined');

	await page.reload();

	expect(await page.textContent('#views')).toBe('42');
	expect(await page.textContent('#session-store-views')).toBe('42');
});

test('[FEAT]: Updating the session', async ({ page, request, context }) => {
	await context.clearCookies();

	await page.goto('/tests/update-session');
	expect(await page.textContent('#views')).toBe('0');
	expect(await page.textContent('#session-store-views')).toBe('undefined');

	await page.reload();

	expect(await page.textContent('#views')).toBe('1');
	expect(await page.textContent('#session-store-views')).toBe('0');

	await page.reload();

	expect(await page.textContent('#views')).toBe('2');
	expect(await page.textContent('#session-store-views')).toBe('1');
});

test('[FEAT]: Updating the session, keeps the expiry', async ({ page, request, context }) => {
	await context.clearCookies();

	const initialResponse = await request.get('/tests/update-session/keep-expiry');
	const initialCookieValue = getCookieValue(initialResponse.headers()['set-cookie']);
	const initialMaxage = Number(getCookieMaxage(initialResponse.headers()['set-cookie']));
	const initialData = await initialResponse.json();

	await new Promise((resolve) => setTimeout(resolve, 2000));

	const updatedResponse = await request.get('/tests/update-session/keep-expiry', {
		headers: { cookie: initialCookieValue }
	});
	const updatedCookieValue = getCookieValue(updatedResponse.headers()['set-cookie']);
	const updatedMaxage = Number(getCookieMaxage(updatedResponse.headers()['set-cookie']));
	const updatedData = await updatedResponse.json();

	expect(updatedMaxage).toBeLessThan(initialMaxage);

	const updatedExpires = updatedData.expires.split('.')[0];
	const initialExpires = initialData.expires.split('.')[0];

	expect(updatedExpires).toStrictEqual(initialExpires);
	expect(updatedData.data.views).toBeGreaterThan(initialData.data.views);
});

test('[FEAT]: Sync the session between server and client', async ({ page, context }) => {
	await context.clearCookies();

	await page.goto('/tests/sync-session');
	await page.waitForTimeout(1000);
	expect(await page.textContent('#session-store-views')).toBe('1');
});

test('[FEAT]: Destroying the session', async ({ page, request, context }) => {
	await context.clearCookies();

	await page.goto('/tests/destroy-session');
	expect(await page.textContent('#views')).toBe('999');

	await page.reload();

	expect(await page.textContent('#views')).toBe('undefined');
});

test('[FEAT]: Refreshing the session', async ({ page, request, context }) => {
	await context.clearCookies();

	const initialResponse = await request.get('/tests/refresh-session');
	const initialCookie = getCookieValue(initialResponse.headers()['set-cookie']);

	const response = await request.get('/tests/refresh-session', {
		headers: { cookie: initialCookie }
	});

	const maxAge = getCookieMaxage(response.headers()['set-cookie']);
	expect(maxAge).toBe('2592000');
});

test('[FEAT]: Password rotation', async ({ page, request, context }) => {
	await context.clearCookies();

	const response = await request.get('/tests/password-rotation');

	await expect(response).toBeOK();

	const data = await response.json();

	expect(data.ok).toBe(true);
});

test('[FEAT]: Chunked cookies', async ({ page, request, context }) => {
	await context.clearCookies();

	await page.goto('/tests/chunked-session');
	expect(await page.textContent('#views')).toContain('0,1,2,3,4,5');
	expect(await page.textContent('#session-store-views')).toBe('undefined');

	await page.reload();

	expect(await page.textContent('#views')).toContain('0,1,2,3,4,5');
	expect(await page.textContent('#session-store-views')).toContain('0,1,2,3,4,5');

	await context.clearCookies();

	await page.goto('/tests/chunked-session/delete');
	expect(await page.textContent('#views')).toContain('0,1,2,3,4,5');
	expect(await page.textContent('#session-store-views')).toBe('undefined');

	await page.reload();
	expect(await page.textContent('#views')).toBe('undefined');
	expect(await page.textContent('#session-store-views')).toContain('0,1,2,3,4,5');
});

test('[FEAT]: Rolling = true should refresh the session every request', async ({
	page,
	request,
	context
}) => {
	await context.clearCookies();

	const response = await request.get('/tests/rolling');

	await expect(response).toBeOK();

	const data = await response.json();

	expect(data.ok).toBe(true);
});

test('[FEAT]: Rolling = number (percentage) should refresh the session if a certain percentage of the expiry is met', async ({
	page,
	request,
	context
}) => {
	await context.clearCookies();

	const response = await request.get('/tests/rolling/percentage');

	await expect(response).toBeOK();

	const data = await response.json();

	expect(data.ok).toBe(true);
});

test('[INTEGRATION]: Binary Secrets', async ({ page, request, context }) => {
	await context.clearCookies();

	const response = await request.get('/tests/binary-secret');

	await expect(response).toBeOK();

	const data = await response.json();

	expect(data.ok, data.reason).toBe(true);
});

test('[INTEGRATION]: Handles special characters', async ({ page, request, context }) => {
	await context.clearCookies();

	await page.goto('/tests/handles-special-chars');
	expect(await page.textContent('#name')).toBe('Jürgen 🤩');
	expect(await page.textContent('#session_name')).toBe('undefined');

	await page.reload();

	expect(await page.textContent('#name')).toBe('Jürgen 🤩');
	expect(await page.textContent('#session_name')).toBe('Jürgen 🤩');
});

test('[INTEGRATION]: Wrong secret deletes the session', async ({ page, request, context }) => {
	await context.clearCookies();

	const response = await request.get('/tests/wrong-secret');

	await expect(response).toBeOK();

	const data = await response.json();

	expect(data.ok).toBe(true);
});

test('[BENCHMARK]: Get session', async ({ request }) => {
	const response = await request.post('/tests/benchmark/get-session', {
		data: {
			runs: 5000
		}
	});

	await expect(response).toBeOK();

	const data = await response.json();

	console.log('[BENCHMARK]: Get -> ', { ...data });
});

*/
