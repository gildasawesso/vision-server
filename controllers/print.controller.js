const { generateReport } = require('../services/doc-generation.service');

module.exports = {
  print: async (req, res) => {
    const { templateName } = req.params;
    const data = req.body;

    const file = await generateReport(templateName, data);

    await res.sendFile(file);
  },
};
