const { generateReport, generateMergedDocument, exportExcelReport } = require('../services/doc-generation.service');

module.exports = {
  print: async (req, res) => {
    const { templateName } = req.params;
    const data = req.body;

    const file = await generateReport(templateName, data);

    await res.sendFile(file);
  },

  multiple: async (req, res) => {
    const dataArray = req.body;

    const file = await generateMergedDocument(dataArray);

    await res.sendFile(file);
  },

  exportExcel: async (req, res) => {
    const { data, header } = req.body;
    const file = exportExcelReport(data, header);

    await res.sendFile(file);
  },
};
