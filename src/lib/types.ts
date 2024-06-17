export type Option = {
    key: string;
    value: string;
};

export type Code = {
    code: string;
}

export type Guest = {
    id: string;
    usedCode: string;
    fullName: string;
    email: string;
    isComing: "TRUE"|"FALSE";
    plusOne: "TRUE"|"FALSE";
    guestId: string;
    notes: string;
}