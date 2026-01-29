import { canUserUseTool, deductCredit } from './supabase';
import { isVectorPDF } from '../utils/pdfUtils';

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
}: ConversionRequest): Promise<void> {

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

  // 3. Execute Backend Job
  // Mocking the API call for now since we don't have a real backend endpoint active for this demo
  console.log(`Executing conversion for ${toolKey} on file ${file.name} (${fileSizeMB}MB)`);

  /* 
  const response = await fetch("/api/convert", {
    method: "POST",
    body: JSON.stringify({
      tool: toolKey,
      file // In real usage, this would likely be a multipart form upload or signed URL
    })
  });
 
  if (!response.ok) {
    throw new Error("Conversion failed");
  }
 
  return await response.blob(); 
  */

  // Mock delay
  await new Promise(resolve => setTimeout(resolve, 2000));
}
