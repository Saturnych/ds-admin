import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ data, fetch }) => {
	const session = data?.session;
	console.log('dashboard.page.load parent session.user.email:', session?.user?.email);

	if (!session?.user) {
		throw redirect(303, '/auth');
	}

	const ip_api_result = await fetch('https://ipapi.co/json');
	const location = await ip_api_result.json();
	console.log(location)

	const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m&current_weather=true`;
	console.log(weather_url)
	const weather_result = await fetch(weather_url);
	const weather = await weather_result.json();
	console.log(weather)

	return {
		session,
		location,
		weather,
	};
};
