const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const https = require('https'); // Import the 'https' module for creating a custom HTTPS agent
const app = express();

app.use(cors());

// Function to scrape data from FreePik
async function scrapeFreePik(query) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await axios.get(`https://www.freepik.com/search?format=search&query=${encodedQuery}`);
        const $ = cheerio.load(response.data);
       
        // Extract image data
        const imageData = [];
        let firstImageSkipped = false; // Flag to skip the first image
        $('img').each((index, element) => {
            const dataSrc = $(element).attr('data-src');
            const src = dataSrc ? dataSrc : $(element).attr('src');
            const alt = encodedQuery; // Set alt to the encoded query
            const width = $(element).attr('width');
            const height = $(element).attr('height');
            
            // Skip the first image which is usually the Google logo
            if (!firstImageSkipped) {
                firstImageSkipped = true;
                return;
            }
            
            // Only include images starting with "https://img.freepik.com"
            if (src && src.startsWith('https://img.freepik.com')) {
                imageData.push({ src, alt, width, height });
            }
        });

        return imageData;
    } catch (error) {
        console.error('Error fetching from FreePik:', error.message);
        return [];
    }
}

// Function to fetch data from Adobe Stock
async function scrapeAdobeStock(query) {
    try {
        const response = await axios.get(`https://stock.adobe.com/in/search?k=${query}`);
        const $ = cheerio.load(response.data);
       
        // Extract image data
        const imageData = [];
        $('img').each((index, element) => {
            const src = $(element).attr('src');
            const alt = query; // Set alt to the query
            const width = $(element).attr('width');
            const height = $(element).attr('height');
            
            // Filter out images not starting with "https://t4.ftcdn.net" or "https://t3.ftcdn.net"
            if (src && (src.startsWith('https://t4.ftcdn.net') || src.startsWith('https://t3.ftcdn.net'))) {
                imageData.push({ src, alt, width, height });
            }
        });

        return imageData;
    } catch (error) {
        console.error('Error fetching from Adobe Stock:', error.message);
        return [];
    }
}

// Function to scrape data from Unsplash
async function scrapeUnsplash(query) {
    try {
        const response = await axios.get(`https://unsplash.com/s/photos/${query}`);
        const $ = cheerio.load(response.data);

        // Extract image URLs directly from img tags
        const imageData = [];
        $('img').each((index, element) => {
            const src = $(element).attr('src');
            if (src && src.startsWith('https://images.unsplash.com/photo-')) {
                const alt = $(element).attr('alt');
                const width = $(element).attr('width');
                const height = $(element).attr('height');
                imageData.push({ src, alt, width, height });
            }
        });

        return imageData;
    } catch (error) {
        console.error('Error fetching from Unsplash:', error.message);
        return [];
    }
}

// Pixabay API configuration
const PIXABAY_API_KEY = '42468670-67e54637bbbb2947f36795255'; // Replace with your Pixabay API key
const PIXABAY_API_URL = 'https://pixabay.com/api/';

// Function to fetch data from Pixabay using the Pixabay API
async function fetchPixabayData(query) {
    try {
        const response = await axios.get(PIXABAY_API_URL, {
            params: {
                key: PIXABAY_API_KEY,
                q: query,
                per_page: 10 // Adjust the number of results per page as needed
            }
        });
        return response.data.hits.map(hit => ({
            src: hit.largeImageURL,
            alt: query,
            width: hit.imageWidth,
            height: hit.imageHeight
        }));
    } catch (error) {
        console.error('Error fetching from Pixabay API:', error.message);
        return [];
    }
}

/// Function to scrape data from all sources
async function scrapeData(query) {
    try {
        const [freePikData, adobeStockData, unsplashData, pixabayData] = await Promise.all([
            scrapeFreePik(query),
            scrapeAdobeStock(query),
            scrapeUnsplash(query),
            fetchPixabayData(query) // Use fetchPixabayData instead of scrapePixabay
        ]);

        // Combine data from all sources
        const imageData = [...freePikData, ...adobeStockData, ...unsplashData, ...pixabayData];

        return { imageData };
    } catch (error) {
        console.error('Error scraping data:', error.message);
        throw new Error('Failed to scrape data');
    }
}


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Express route to fetch and display scraped data based on specified services or from all sources
app.get('/data', async (req, res, next) => {
    const query = req.query.query;
    const services = req.query.service ? req.query.service.split(',') : [];

    try {
        if (!query) {
            throw new Error('No query provided');
        }

        let imageData = [];

        if (services.includes('all')) {
            const [freePikData, adobeStockData, unsplashData, pixabayData] = await Promise.all([
                scrapeFreePik(query),
                scrapeAdobeStock(query),
                scrapeUnsplash(query),
                fetchPixabayData(query)
            ]);

            // Combine data from all sources
            imageData = [...freePikData, ...adobeStockData, ...unsplashData, ...pixabayData];
        } else {
            // Fetch data from each specified service
            for (const service of services) {
                switch (service.trim()) {
                    case 'freepik':
                        imageData.push(...await scrapeFreePik(query));
                        break;
                    case 'unsplash':
                        imageData.push(...await scrapeUnsplash(query));
                        break;
                    case 'adobe':
                        imageData.push(...await scrapeAdobeStock(query));
                        break;
                    case 'pixabay':
                        imageData.push(...await fetchPixabayData(query));
                        break;
                    default:
                        throw new Error(`Invalid service specified: ${service}`);
                }
            }
        }

        if (imageData.length === 0) {
            throw new Error('No results found');
        }

        res.json({ imageData });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ error: error.message });
    }
});


// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
