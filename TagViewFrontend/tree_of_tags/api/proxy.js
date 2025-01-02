// api/proxy.js
export default async function handler(req, res) {
  const apiUrl = 'http://206.189.135.103:80/api/';  // Your backend API URL (HTTP)

  let backendUrl = apiUrl + req.url;  // Default to the same URL as the request path

  try {
      // Modify the backend URL for POST and PUT based on your specific needs
      if (req.method === 'POST') {
          // For POST, you might have a different endpoint
          backendUrl = apiUrl + 'add-new-tree/';
      } else if (req.method === 'PUT') {
          // For PUT, you might have a different endpoint
          backendUrl = apiUrl + 'update-tree/';
      }
      else {
        backendUrl = apiUrl + 'tree/';
      }

      // Proxy the request to the appropriate backend API
      const response = await fetch(backendUrl, {
          method: req.method,  // Preserve the original HTTP method
          headers: {
              'Content-Type': req.headers['content-type'],  // Preserve the Content-Type header
              // Add other headers as needed (e.g., authorization)
          },
          body: req.method !== 'GET' ? JSON.stringify(req.body) : null,  // Pass the body for POST/PUT
      });

      // Read the response from the backend API
      const data = await response.json();

      // Send the backend API response back to the client
      res.status(response.status).json(data);
  } catch (error) {
      // Handle errors (e.g., API not reachable, etc.)
      console.error('Error forwarding request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
