export function isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
  
  export function getUser(): any | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  
  export function getUserRole(): string | null {
    const user = getUser();
    return user?.rol || null;
  }
  
  export function logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  
  