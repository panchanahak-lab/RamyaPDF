export type PlanType = 'free' | 'pro' | 'enterprise';

export interface ToolConfig {
    input: string[];
    output: string;
    category: 'cad' | 'binary' | 'document' | 'other';
    plan_required: PlanType;
    vector_only?: boolean;
    restricted?: boolean;
}

export const CONVERSION_TOOLS: Record<string, ToolConfig> = {
    dwg_to_pdf: {
        input: ["dwg", "dxf", "dwt"],
        output: "pdf",
        category: "cad",
        plan_required: "pro"
    },
    pdf_to_dwg: {
        input: ["pdf"],
        output: "dwg",
        category: "cad",
        plan_required: "pro",
        vector_only: true
    },
    cad_to_pdf: {
        input: ["dwg", "dxf"],
        output: "pdf",
        category: "cad",
        plan_required: "pro"
    },
    bin_to_pdf: {
        input: ["bin"],
        output: "pdf",
        category: "binary",
        plan_required: "enterprise",
        restricted: true
    },
    pdf_to_bin: {
        input: ["pdf"],
        output: "bin",
        category: "binary",
        plan_required: "enterprise",
        restricted: true
    }
};
