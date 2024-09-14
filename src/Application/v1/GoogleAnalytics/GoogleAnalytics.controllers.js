import { google } from 'googleapis';
import config from '../../../config/index.js';

const { googleApi } = config();

const authenticate = async () => {
  const privateKey = googleApi.privateKey.replace(/\\n/g, '\n');
  const authClient = new google.auth.JWT({
    email: googleApi.email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });

  try {
    await authClient.authorize();
    console.log('Autenticación exitosa');
    return authClient;
  } catch (error) {
    console.error('Error en la autenticación:', error);
    throw error;
  }
}
export const getViewPage = async (req, res) => {
  try {
    const authClient = await authenticate();
    const analytics = google.analyticsdata('v1beta');
    const response = await analytics.properties.runReport({
      auth: authClient,
      property: `properties/${googleApi.viewId}`,
      requestBody: {
        dateRanges: [{ startDate: '2024-01-01', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'eventCount' }],
      }
    });

    console.log('Respuesta de Google Analytics:', response);

    if (!response.data.rows || response.data.rows.length === 0) {
      console.log('No se encontraron datos.');
      res.json({ pageViews: 0 });
      return;
    }

    const pageViews = response.data.rows[0].metricValues[0].value;
    res.json({ pageViews });
  } catch (error) {
    console.error('Error obteniendo los datos de Google Analytics:', error);
    res.status(500).send(`Error obteniendo los datos de Google Analytics: ${error}`);
  }
};