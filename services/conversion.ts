import { canUserUseTool, deductCredit, logConversionUsage } from './supabase';
import { isVectorPDF } from '../utils/pdfUtils';
import { CONVERSION_TOOLS } from '../constants/tools';

interface ConversionRequest {
  user: { id: string; plan_type: string };
  toolKey: string;
  file: File;
  fileSizeMB: number;
}

export async function executeConversion({
  user,
  toolKey,
  file,
  fileSizeMB
}: ConversionRequest): Promise<Blob> {

  // 0. Pre-check: Vector PDF Requirement
  if (toolKey === 'pdf_to_dwg') {
    const vectorOk = await isVectorPDF(file);
    if (!vectorOk) {
      throw new Error("VECTOR_REQUIRED");
    }
  }

  // 1. Validate Access
  const accessResult = await canUserUseTool(user.id, toolKey);

  if (!accessResult.allowed) {
    throw new Error(accessResult.reason || "Access denied");
  }

  // 2. Deduct Credit (Free users only)
  // Pro/Enterprise users have unlimited access (handled by canUserUseTool logic already, 
  // but we only deduct credits for free users as per requirement)
  if (user.plan_type === 'free') {
    await deductCredit(user.id, toolKey, fileSizeMB);
  }

  // 3. Log Usage (for all users)
  // Retrieve tool config for metadata
  // toolKey is already normalized in PDFEditor, so we can use it directly? 
  // Wait, executeConversion receives toolKey. Let's assume it matches keys in CONVERSION_TOOLS.
  const config = CONVERSION_TOOLS[toolKey];

  await logConversionUsage(user.id, toolKey, fileSizeMB, {
    input_format: file.name.split('.').pop()?.toLowerCase(), // simple extension extraction
    output_format: config?.output,
    conversion_type: config?.category
  });

  // 4. Execute Backend Job
  console.log(`Executing conversion for ${toolKey} on file ${file.name} (${fileSizeMB}MB)`);

  const formData = new FormData();
  formData.append('tool', toolKey);
  formData.append('file', file);

  const response = await fetch("/api/convert", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Conversion failed");
  }

  return await response.blob();
}
