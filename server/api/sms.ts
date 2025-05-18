export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const { phone, text } = query;

	const username = 'bystrodmitry@gmail.com';
	const password = 'xqWskvxVhlKXRQs40yE5T228FgGJrYFa';

	const base64 = Buffer.from(`${username}:${password}`).toString('base64');

	const url = `https://gate.smsaero.ru/v2/sms/send?number=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&sign=SMS Aero`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Basic ${base64}`,
		},
	});

	const data = await response.json();
	return data;
});
