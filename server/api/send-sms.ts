import { defineEventHandler, readBody } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { phone, message } = body;

	try {
		const response = await axios.get('https://sms.ru/sms/send', {
			params: {
				api_id: process.env.SMSRU_API_KEY,
				to: phone,
				msg: message,
				json: 1,
			},
		});

		const data = response.data;

		if (data.status === 'OK') {
			return {
				success: true,
				sms_id: data.sms[phone].sms_id,
			};
		}
		else {
			return {
				success: false,
				error: data.status_text,
			};
		}
	}
	catch (e: any) {
		return {
			success: false,
			error: e.message,
		};
	}
});
