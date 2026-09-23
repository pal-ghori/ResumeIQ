import PDFParser from "pdf2json";
import mammoth from "mammoth";

export function extractText(filePath, mimeType) {
  return new Promise(async (resolve, reject) => {
    try {
      // PDF
      if (mimeType === "application/pdf") {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", (err) => {
          reject(err.parserError);
        });

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
          let text = "";

          pdfData.Pages.forEach((page) => {
            page.Texts.forEach((item) => {
              item.R.forEach((r) => {
                text += decodeURIComponent(r.T) + " ";
              });
            });

            text += "\n";
          });

          resolve(text);
        });

        pdfParser.loadPDF(filePath);
        return;
      }

      // DOCX
      if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({
          path: filePath,
        });

        resolve(result.value);
        return;
      }

      reject(new Error("Unsupported file type"));
    } catch (err) {
      reject(err);
    }
  });
}