const { generateReport, generateMergedDocument } = require('../services/doc-generation.service');

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
};
