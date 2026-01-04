// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Token management
export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

export function setToken(token: string): void {
  localStorage.setItem("authToken", token);
}

export function removeToken(): void {
  localStorage.removeItem("authToken");
}

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Helper function to handle API responses
async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "An error occurred");
  }

  return data.data;
}

// ============ AUTH API ============

export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export async function userSignUp(
  email: string,
  password: string,
  displayName: string
) {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, displayName }),
  });

  const data = await handleResponse(response);

  // Store token if returned
  if (data.token) {
    setToken(data.token);
  }

  return data;
}

export async function userSignIn(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);

  // Store token
  if (data.token) {
    setToken(data.token);
  }

  return data;
}

export async function signOut() {
  const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  // Remove token from localStorage
  removeToken();

  return handleResponse(response);
}

export async function getCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export async function verifyToken() {
  const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export async function verifyAdminToken() {
  const response = await fetch(`${API_BASE_URL}/api/admin/verify`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export async function adminSignIn(masterPassword: string) {
  const response = await fetch(`${API_BASE_URL}/api/admin/verify-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: masterPassword }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Invalid admin password");
  }

  // Store token
  if (data.token) {
    setToken(data.token);
  }

  return { authenticated: true, userRole: "admin", token: data.token };
}

// ============ SHOP API ============

export interface ShopItem {
  id?: number;
  created_at?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stars: number;
  num_reviews: number;
  reviews?: string;
  Image_path: string;
}

export async function getShopItems(): Promise<ShopItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/shop/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
}

export async function addShopItem(item: ShopItem) {
  const response = await fetch(`${API_BASE_URL}/api/shop/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });

  return handleResponse(response);
}

export async function updateShopItem(id: number, item: Partial<ShopItem>) {
  const response = await fetch(`${API_BASE_URL}/api/shop/items/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });

  return handleResponse(response);
}

export async function deleteShopItem(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/shop/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to delete item");
  }

  return data;
}

// ============ UPLOAD API ============

export async function uploadImage(
  file: File,
  bucket: string = "shop-images"
): Promise<string> {
  // Convert file to base64
  const fileData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data:image/xxx;base64, prefix
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileData,
      fileName: file.name,
      bucket,
    }),
  });

  return handleResponse(response);
}

export async function deleteImage(
  imagePath: string,
  bucket: string = "shop-images"
) {
  const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imagePath,
      bucket,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to delete image");
  }

  return data;
}
