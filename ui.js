module.exports = api => {
  // Use the API here
  api.describeTask({
    match: /add-component/,
    description: 'add a new tablePage',
    link: 'https://www.npmjs.com/package/vue-cli-plugin-anov-fe'
  })
}