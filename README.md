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
      "src": "https://img.freepik.com/free-photo/beautiful-landscape-grand-teton-national-park-wyoming-united-states_181624-60981.jpg?size=626&ext=jpg",
      "alt": "nature",
      "width": "626",
      "height": "417"
    },
    {
      "src": "https://t3.ftcdn.net/jpg/02/67/43/44/360_F_267434405_rVfKoBDQpb6smmbNtDRWvzAYCYpsX47E.jpg",
      "alt": "nature",
      "width": "360",
      "height": "240"
    }
  ]
}
```

### Response

The API returns a JSON object with an array of image data, including `src`, `alt`, `width`, and `height` for each image.



## 🛠️ Technologies Used



- Node.js
- Express.js
- Axios
- Cheerio

## 🚀 Deployment

This API is deployed on Glitch. You can also deploy it to platforms like Heroku, Vercel, or AWS Lambda.

## 📜 Details



Feel free to explore and enjoy using the Image Search API! 😊🌈

- ## 💵 Donate

- 
```
<a href="https://www.buymeacoffee.com/paytojaypaun"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=paytojaypaun&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
```


## ⚠️ Disclaimer: Unofficial Image Search API

This project utilizes an unofficial Image Search API to retrieve images. Please be aware that this API is not affiliated with any of the image sources it searches. While efforts are made to provide accurate and reliable results, there may be discrepancies or limitations compared to using the official APIs provided by these platforms. Users are advised to exercise caution and understand the potential risks associated with using unofficial tools.

## Contributors ✨

Thanks to all the wonderful people who have contributed to this project:

- [@1234worldcom](https://github.com/1234worldcom) (Jay Paun) 🚀

