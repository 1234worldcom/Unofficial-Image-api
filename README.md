# 🌟 Image Search API 🌟

Welcome to the Image Search API! 🚀 This API allows you to search for images from various sources including FreePik, Adobe Stock, Unsplash, and Pixabay.

## 📝 Usage

### Base URL

https://mulberry-tiny-washer.glitch.me/data


### Parameters

- `query` (required): The search query.
- `service` (optional): The services to search from. Use comma-separated values to search from multiple services. Available options: `freepik`, `adobe`, `unsplash`, `pixabay`, `all`.

### Example

To search for images of "nature" from all services:

https://mulberry-tiny-washer.glitch.me/data?query=nature&service=all


To search for images of "mountains" from FreePik and Unsplash:

https://mulberry-tiny-washer.glitch.me/data?query=mountains&service=freepik,unsplash


### Response

The API returns a JSON object with an array of image data, including `src`, `alt`, `width`, and `height` for each image.

## 🛠️ Technologies Used

- Node.js
- Express.js
- Axios
- Cheerio

## 🚀 Deployment

This API is deployed on Glitch. You can also deploy it to platforms like Heroku, Vercel, or AWS Lambda.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Feel free to explore and enjoy using the Image Search API! 😊🌈

