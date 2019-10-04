const { generateReport } = require('../services/doc-generation.service');

async function print(req, res) {
  const { templateName } = req.params;
  const data = req.body;

  const file = await generateReport(templateName, data);

  await res.json(file);
}

module.exports.print = print;
