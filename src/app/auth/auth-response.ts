export interface AuthResponse {
    success: boolean;
    message: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    role: string;
}
