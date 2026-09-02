// This function runs on Netlify's servers, never in the user's browser.
// The REST API key is read from an environment variable (set in the Netlify
// dashboard under Site settings -> Environment variables) so it never appears
// in any file that gets published or shared.

const ONESIGNAL_APP_ID = 'c71df04d-deb1-45fa-bf71-99c642847216';

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { playerId, message, sendAfter } = payload;
  if (!playerId || !message || !sendAfter) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing playerId, message, or sendAfter' })
    };
  }

  const restApiKey = process.env.ONESIGNAL_REST_API_KEY;
  if (!restApiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'ONESIGNAL_REST_API_KEY is not set on the server' })
    };
  }

  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Key ${restApiKey}`
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        include_subscription_ids: [playerId],
        contents: { en: message },
        send_after: sendAfter
      })
    });

    const data = await response.json();
    return {
      statusCode: response.ok ? 200 : 500,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
