<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# RamyaPDF - Advanced Document Tools

A professional-grade PDF editor and conversion suite with granular access control, built for scalability.

## 🚀 Features

### Core Tools

- **PDF Editing**: Annotate, sign, and modify PDFs.
- **Conversion**: PDF to Word, Excel, JPG, and more.
- **Organization**: Merge, split, and reorder pages.

### Advanced Conversion (New)

- **CAD Support (`PRO`)**:
  - Convert DWG/DXF to PDF.
  - Convert **Vector PDFs** to DWG (Includes strict vector validation).
- **Binary Support (`ENTERPRISE`)**:
  - Secure BIN to PDF conversion (Requires 'CADBIN'/'DXFBIN' signature).

### Enterprise-Grade Security & Access

- **Plan-Based Access**:
  - **Free**: Daily credit limits.
  - **Pro**: Unlimited access to standard & CAD tools.
  - **Enterprise**: Exclusive access to binary tools.
- **Usage Tracking**: Detailed logs for every conversion in Supabase.
- **Visual Badging**: Clear `PRO` and `ENTERPRISE` indicators.

## 🛠️ Setup & Installation

**Prerequisites:** Node.js, Vercel CLI (optional)

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create `.env.local`:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_key (Optional for AI features)
   ```

3. **Run Locally:**

   ```bash
   npm run dev
   ```

## 🗄️ Database Schema (Supabase)

This app requires the following Supabase setup:

**Tables:**

- `profiles`: `id` (uuid), `plan_type` (text), `credits_remaining` (int)
- `usage_logs`: `id`, `user_id`, `tool_name`, `file_size_mb`, `input_format`, `output_format`

**RPC Functions:**

- `decrement_credit`: Safely deducts user credits.

## 🔒 Security

- **Vector Validation**: `pdf_to_dwg` strictly rejects scanned/raster PDFs to prevent server load.
- **Signature Checks**: `bin_to_pdf` validates file headers before processing.
- **Backend Isolation**: Conversion logic is protected behind `/api/convert`.
