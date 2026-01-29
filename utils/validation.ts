/**
 * Utility functions for file validation.
 */

export async function validateBinFile(file: File): Promise<void> {
    const knownSignatures = ["CADBIN", "DXFBIN"];

    // Read the first 20 bytes to check the header
    const chunk = file.slice(0, 20);
    const text = await chunk.text();

    // Check if any signature exists in the start of the file
    // simplistic check: strict start or just includes? User said "file.header.includes" which implies presence.
    // We'll check if the text includes the signature.
    if (!knownSignatures.some(sig => text.includes(sig))) {
        throw new Error(
            "UNSUPPORTED_BIN_FORMAT"
        );
    }
}
