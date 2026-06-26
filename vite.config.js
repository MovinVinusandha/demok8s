import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Define the data directory path and the text file path
const dataDir = path.resolve(__dirname, 'data');
const filePath = path.join(dataDir, 'saved_text.txt');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'text-file-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Endpoint to save text
          if (req.method === 'POST' && req.url === '/api/save-text') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
              try {
                const { text } = JSON.parse(body);
                
                // Ensure the "data" directory exists before writing the file
                if (!fs.existsSync(dataDir)) {
                  fs.mkdirSync(dataDir, { recursive: true });
                }

                fs.writeFileSync(filePath, text || '', 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to save text' }));
              }
            });
            return;
          }

          // Endpoint to fetch saved text
          if (req.method === 'GET' && req.url === '/api/get-text') {
            try {
              if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ text: content }));
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ text: '' }));
              }
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Failed to read text' }));
            }
            return;
          }

          next();
        });
      }
    }
  ],
})