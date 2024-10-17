export
interface FreelancerData {
    firstName: string;
        lastName: string;
        photo?: File;
        description: string;
        language: string[];
        experience: {
            expertise: string;
            fromYear: number;
            toYear: number;
        }[]; 
        skills: string[];
        education?: {
            collageName: string;
            title: string;
            year: number;
        }[];
        certification?: {
            name: string;
            year: number;
            file?: File;
        }[];
        portfolio?: string;
        email: string;
        phone?: string;
}
