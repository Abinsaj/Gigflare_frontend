export
interface FreelancerData {
    firstName: string;
    lastName: string;
    photo?: string;
    description: string;
    language: string[];
    experience: {
        expertise: string;
        fromYear: number;
        toYear: number;
    }[]; // Allowing multiple entries
    skills: string[];
    education?: {
        collageName: string;
        title: string;
        year: number;
    }[]; // Allowing multiple entries
    certification?: {
        name: string;
        year: number;
    }[]; // Allowing multiple entries
    portfolio?: string;
    email: string;
    phone?: string;
}
