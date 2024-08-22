export const oneMB = 1048576;

export const maxFilesValue = Number(process.env.NEXT_PUBLIC_MAX_FILES) || 4;

export const maxFilesSizeValue =
    Number(process.env.NEXT_PUBLIC_MAX_FILES_SIZE) || oneMB;

