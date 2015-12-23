module.exports = [
  {include: /\.(png|jpg|jpeg|gif|woff)$/, loaders: ["url-loader?limit=1000&name=[name]__[hash].[ext]"]},
  {include: /\.mp4$/, loaders: ["url-loader?limit=10000&name=[name]__[hash].[ext]"]},
  {include: /\.svg$/, loaders: ["raw-loader"]},
  {include: /\.json$/, loaders: ["json-loader"]}
]
