const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs').promises;
const fs2 = require('fs');
const path = require('path');
const converter = require('office-converter')();
const merge = require('easy-pdf-merge');
const XLSX = require('xlsx');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

async function generatePDF(inputFile) {
  return new Promise((resolve, reject) => {
    converter.generatePdf(inputFile, (err, result) => {
      return err ? reject(err) : resolve(result.outputFile);
    });
  });
}

async function generateDocument(templateName, data, outputFile) {
  const content = await fs.readFile(`${path.resolve()}/templates/${templateName}`, 'binary');
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

  fs2.writeFileSync(outputFile, buffer);

  return generatePDF(outputFile);
}

async function mergeDocuments(dataArray) {
  const files = dataArray.map((data, index) => `${path.resolve()}/reports/document-${index}.pdf`);

  return new Promise((resolve, reject) => {
    const outputFile = `${path.resolve()}/reports/mergedDocument.pdf`;

    merge(files, outputFile, function(err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(outputFile);
    });
  });
}

async function generateReport(documentName, data) {
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

module.exports = {
  generateReport: generateReport,

  generateMergedDocument: async dataArray => {
    if (dataArray.length > 1) {
      await asyncForEach(dataArray, async (data, index) => {
        const templateName = `bulletin-${data.examinationsTypes.length}-notes.docx`;
        const outputFile = `${path.resolve()}/reports/document-${index}.docx`;

        await generateDocument(templateName, data, outputFile);
      });

      return mergeDocuments(dataArray);
    }
    const templateName = `bulletin-${dataArray[0].examinationsTypes.length}-notes`;

    return generateReport(templateName, dataArray[0]);
  },

  exportExcelReport: (data) => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Export');
    const reportFile = `${path.resolve()}/reports/export-excel.xlsx`;

    XLSX.writeFile(workBook, reportFile, { type: 'file' });

    return reportFile;
  },
};
