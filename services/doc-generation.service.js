const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs').promises;
const path = require('path');
const converter = require('office-converter')();

async function generatePDF(inputFile) {
  return new Promise((resolve, reject) => {
    converter.generatePdf(inputFile, (err, result) => {
      return err ? reject(err) : resolve(result.outputFile);
    });
  });
}

async function generateDocument(documentName, data) {
  const content = await fs.readFile(`${path.resolve()}/templates/${documentName}.docx`, 'binary');
  const zip = new PizZip(content);
  const doc = new Docxtemplater();

  doc.loadZip(zip);
  doc.setData(data);

  try {
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };

    console.error(JSON.stringify({ error: e }));
    throw error;
  }

  const buffer = doc.getZip().generate({ type: 'nodebuffer' });

  const filepath = `${path.resolve()}/reports/output.docx`;

  await fs.writeFile(filepath, buffer);

  return generatePDF(filepath);
}

module.exports.generateReport = generateDocument;
