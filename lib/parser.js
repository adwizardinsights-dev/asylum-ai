// Document text extraction — PDF, DOCX, TXT
// Images: TODO — add Tesseract OCR when needed

export async function extractText(buffer, filename) {
  const ext = filename.split('.').pop().toLowerCase()

  if (ext === 'txt') {
    return buffer.toString('utf8')
  }

  if (ext === 'pdf') {
    try {
      const pdfParse = (await import('pdf-parse')).default
      const result = await pdfParse(buffer)
      return result.text
    } catch {
      return `[PDF "${filename}" could not be parsed automatically. Please copy and paste the relevant text into your narrative instead.]`
    }
  }

  if (ext === 'docx' || ext === 'doc') {
    const mammoth = await import('mammoth')
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  if (['jpg','jpeg','png','gif','webp'].includes(ext)) {
    // OCR placeholder — requires Tesseract
    return `[Image file: ${filename} — text extraction not available in MVP. Please describe the document contents in your narrative.]`
  }

  throw new Error(`Unsupported file type: .${ext}. Supported: PDF, DOCX, TXT.`)
}
