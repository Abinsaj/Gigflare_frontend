export
interface FreelanceData {
    firstName: string;
    lastName: string;
    photo?: File;
    description: string;
    language: string[];
    experience: {
        expertise: string;
        fromYear: number;
        toYear: number;
    };
    skills: string[];
    education?: Array<{
        collageName: string;
        title: string;
        year: number;
    }>;
    certification?: Array<{
        name: string;
        year: number;
        file?: File;
    }>;
    portfolio?: string;
    email: string;
    phone?: string;
}
