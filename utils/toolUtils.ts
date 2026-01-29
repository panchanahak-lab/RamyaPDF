import { CONVERSION_TOOLS } from '../constants/tools';

export function getToolBadge(toolKey: string): string | null {
    // Normalize key lookup
    const normalizedKey = toolKey.toLowerCase().replace(/\s+/g, '_');
    const tool = CONVERSION_TOOLS[normalizedKey];

    if (!tool) return null;

    if (tool.plan_required === "pro") return "PRO";
    if (tool.plan_required === "enterprise") return "ENTERPRISE";

    return null;
}
