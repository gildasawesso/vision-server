const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const fs = require('fs').promises;
const path = require('path');

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

  await fs.writeFile(path.resolve(__dirname, 'output.docx'), buffer);

  return { good: 'good' };
}

module.exports.generateReport = generateDocument;
