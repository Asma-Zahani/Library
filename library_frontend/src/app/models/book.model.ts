import { User } from "./user.model";

export interface AuthorDTO {
    key: string;
    name: string;
}

export interface Category {
    id?: number;
    name?: string; // Assuming the category has a name field
}


export interface Book {
    id?: number;
    title: string;                      // Title of the book
    archiveId: string;                  // Unique identifier
    categories: Category[];             // List of categories
    coverId: string;                    // Cover image identifier
    firstPublishYear: number;           // Year of first publication
    authors: AuthorDTO[];               // List of authors
    coverEditionKey: string;            // Key for the cover edition
    availabilityStatus: string;         // Status of availability
    price: number;                      // Price of the book
    availableQuantity: number;          // Quantity available
    user?: User;                        // User associated with the book (optional)
    description?: string;
    imageUrl: string
}
