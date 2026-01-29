import * as pdfjsLib from 'pdfjs-dist';

// Configure worker - using CDN for simplicity in standard Vite setups without complex config
// In a production build with specific asset handling, this might be pointed to a local asset.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

/**
 * Extracts all text from a PDF file.
 */
export async function extractPdfText(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';

    // Iterate through all pages
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
        fullText += pageText + ' ';
    }

    return fullText.trim();
}

/**
 * Detects the number of images embedded in the PDF.
 * This checks the operator list for image painting operations.
 */
export async function detectEmbeddedImages(file: File): Promise<number> {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let imageCount = 0;

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const ops = await page.getOperatorList();

        // Scan for image painting operators
        // pdfjsLib.OPS.paintImageXObject
        // pdfjsLib.OPS.paintInlineImageXObject
        for (const fn of ops.fnArray) {
            if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
                imageCount++;
            }
        }
    }

    return imageCount;
}

/**
 * Determines if files is likely a Vector PDF (CAD-convertible) vs a pure scan.
 */
export async function isVectorPDF(file: File): Promise<boolean> {
    try {
        const textContent = await extractPdfText(file);
        const imageCount = await detectEmbeddedImages(file);

        // Heuristic:
        // 1. If it has significant text (>50 chars), it's likely vector-based or OCR'd.
        // 2. If it has very little text (<50 chars) AND contains images, it's likely a scan.
        // 3. If it has no text and no images... it's empty or weird, but we'll assume vector to be safe/permissive.

        if (textContent.length < 50 && imageCount > 0) {
            console.log("Validation: PDF seems to be a raster scan (Low text, has images).");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error analyzing PDF:", error);
        // Fail open or closed? For "Pro" feature, fail open might be safer to avoid blocking valid files on errors, 
        // but to protect backend, fail closed (false) is safer. 
        // Let's return false if we can't parse it—invalid PDF for our too.
        return false;
    }
}
