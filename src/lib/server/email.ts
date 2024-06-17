import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { MAILGUN_KEY, MAILGUN_DOMAIN } from '$env/static/private';
import { flattenObj } from '$lib/utils';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: MAILGUN_KEY, });

export async function sendEmailTemplate(from: string, to: string[], subject: string, template: string, template_variables: any) {
	mg.messages
		.create(MAILGUN_DOMAIN, {
			from,
			to,
			subject,
            template,
            "h:X-Mailgun-Variables": JSON.stringify(flattenObj(template_variables))
		})
		.then((msg) => console.log(msg)) // logs response data
		.catch((err) => console.log(err)); // logs any error
}
