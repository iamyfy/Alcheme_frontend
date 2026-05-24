// TODO (phase 2): connect to Supabase auth.
export function useAuth() {
  return {
    userId: null as string | null,
    isAuthenticated: false,
    isLoading: false,
  };
}
