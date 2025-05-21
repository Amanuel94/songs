export const sanitizeStringInput = (input: string): string => {
    // Remove leading and trailing whitespace
    let sanitizedInput = input.trim();
    
    // Remove any HTML tags
    sanitizedInput = sanitizedInput.replace(/<\/?[^>]+(>|$)/g, "");
    
    // Remove any special characters (except for spaces)
    sanitizedInput = sanitizedInput.replace(/[^\w\s]/gi, "");
    
    // Limit the length to a maximum of 255 characters
    if (sanitizedInput.length > 255) {
        sanitizedInput = sanitizedInput.substring(0, 255);
    }

    // convert to lowercase
    sanitizedInput = sanitizedInput.toLowerCase();
    
    return sanitizedInput;
    }