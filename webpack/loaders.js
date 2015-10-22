module.exports = [
  {include: /\.(png|jpg|jpeg|gif|woff|mp4)$/, loaders: ["url-loader"]},
  {include: /\.svg$/, loaders: ["raw-loader"]},
  {include: /\.json$/, loaders: ["json-loader"]}
]
