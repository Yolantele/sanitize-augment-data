const csv = require('csv-parser')
const fs = require('fs')
const results = []

// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2

// Creates a translate client
const translator = new Translate({
  projectId: 'natural-osprey-273717',
  keyFilename: '/Users/jolantajas/Projects/recycling/service-account.json'
})

const translateText = async (
  text = ['maak dit in een andere taal', 'ik wil niet iets anders zeggen', '']
) => {
  const target = 'en'
  let [translations] = await translator.translate(text, target)
  translations = Array.isArray(translations) ? translations : [translations]
  return translations
}

translateText()

let undescribedEuralCodes = []

const codesWithoutDescription = (code, desc) => {
  let codes = []
  if (desc.length === 0) codesWithoughtDescription.push(code)
  return [...new Set(codes)]
}

const saveFile = (name, content) => {
  fs.writeFile(`/Users/jolantajas/Projects/recycling/${name}.json`, content, 'utf8', err => {
    if (err) return console.log(err)
    console.log('The file was saved!')
  })
}

const modifyCSV = () => {
  fs.createReadStream('nlData.csv')
    .pipe(csv())
    .on('data', row => {
      let { description, material, euralDescription, euralCode } = row
      // undescribedEuralCodes = codesWithoutDescription(euralCode, euralDescription)
      if (description.length < 7) description = `${description}, ${euralDescription}`

      let values = Object.values(row)
      let keys = Object.keys(row)
      // Object created
      var obj = {}

      // Using loop to insert key
      // value in Object
      for (var i = 0; i < keys.length; i++) {
        obj[keys[i]] = values[i]
      }

      results.push(obj)
    })
    .on('end', () => {
      console.log(results)
      // let newResults = JSON.stringify(results)
      // console.log(typeof newResults)
      // saveFile('enrichedNlData', newResults)
    })
}

// modifyCSV()
