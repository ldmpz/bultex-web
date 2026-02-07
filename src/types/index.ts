export interface Category {
    id: string;
    name: string;
    slug: string;
    image_url?: string;
    created_at?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    category_id: string | null;
    image_url: string | null;
    ml_link: string | null;
    is_active: boolean;
    created_at?: string;
    categories?: Category | null; // Joined category
}
