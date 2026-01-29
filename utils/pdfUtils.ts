/**
 * Utility functions for analyzing PDF content.
 * Note: Real implementation would require 'pdfjs-dist' or similar library.
 * Currently using mock heuristics for demonstration.
 */

export async function extractPdfText(file: File): Promise<string> {
    // Simulate text extraction delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // MOCK: If file name contains "scan", allow it to fail text check
    if (file.name.toLowerCase().includes('scan')) {
        return "";
    }

    // Default to returning some text (Simulate Vector PDF)
    return "Sample text content from PDF...";
}

export async function detectEmbeddedImages(file: File): Promise<number> {
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // MOCK: If file name contains "image" or "scan", say it has images
    if (file.name.toLowerCase().includes('scan') || file.name.toLowerCase().includes('image')) {
        return 5;
    }

    return 0;
}

export async function isVectorPDF(file: File): Promise<boolean> {
    // Heuristic check
    // 1. Extract text
    const textContent = await extractPdfText(file);

    // 2. Check for images
    const imageCount = await detectEmbeddedImages(file);

    // If mostly image and little text -> likely scanned
    if (imageCount > 0 && textContent.length < 50) {
        return false; // scanned PDF
    }
    return true;
}
