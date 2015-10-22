import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import renderRouteHTML from './renderRouteHTML.js'

var app = express();
var port = process.env.PORT || 8000

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('./public'))

app.get('*', function (req, res) {
  // pre-render views via webpack
  renderRouteHTML(req, res)
})

app.listen(port)

