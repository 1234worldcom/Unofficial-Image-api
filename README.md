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


To search for images of "mountains" from FreePik and Adobe:

https://mulberry-tiny-washer.glitch.me/data?query=mountains&service=freepik,adobe

### Sample Response

```json
{
  "imageData": [
    {
      "src": "https://img.freepik.com/free-photo/panoramic-nature-background-mountain-river-pine-forest_74986-44.jpg?size=626&ext=jpg",
      "alt": "nature",
      "width": "626",
      "height": "417"
    },
    {
      "src": "https://t4.ftcdn.net/jpg/02/36/71/89/360_F_236718987_6zVn0jDLwMnG7F29iee9n7PcOcvB1KWT.jpg",
      "alt": "nature",
      "width": "360",
      "height": "240"
    }
  ]
}
```json

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

## Contributors ✨

Thanks to all the wonderful people who have contributed to this project:

- [@1234worldcom](https://github.com/1234worldcom) (Jay Paun) 🚀
