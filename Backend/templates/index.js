export default function(hostname, initialHTML, initialState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>soti</title>
        <link rel="stylesheet" href="${hostname}/build/style.css">
        <link rel="icon" href="${hostname}/favicon.png" type="image/x-icon" />
      </head>
      <body>
        <div id="react-view"></div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
        <script type="application/javascript" src="${hostname}/build/bundle.js"></script>
      </body>
    </html>
  `
}
